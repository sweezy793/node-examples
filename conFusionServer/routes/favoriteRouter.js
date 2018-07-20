const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.cors, authenticate.verifyUser,
	(req,res,next) => {
		Favorites.findOne({user: req.user._id}) //mongodb method to check if the user accessing is same as the user who wants to favorite
		.populate('user dishes') //this will show all the details of user and dishes object as per the schema
		.then((favorite) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(favorite);
		}, (err) => next(err))
		.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,
	(req, res, next) => {

		Favorites.findOne({user: req.user._id}) //mongodb method to check if the user accessing is same as the user who wants to favorite
		.then((favorite) => {

			if(favorite == null){  // initially when the document is empty and info is being added and document is created

				favorite = {};
				favorite.user = req.user._id;
				favorite.dishes = req.body;

				Favorites.create(favorite)	
				.then((favorite) => {

					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);

				}, (err) => next(err));
			}
			else{	

				var hasNew = false;

				for(i in req.body){
					if(favorite.dishes.indexOf(req.body[i]._id) === -1){ //if the dish is not found already in the document then it is pushed to document
						favorite.dishes.push(req.body[i]);

						if(!hasNew){
							hasNew = true;
						}
					}
				}	

				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');

				if(hasNew){
					favorite.save() //more dishes added to document
					.then((favorite) => {
						res.json(favorite);	
					}, (err) => next(err));
				}
				else{
					res.json(favorite);	
				}

			}
		}, (err) => next(err))
		.catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser, 
	(req, res, next) => {
	res.statusCode = 403;
	res.end("PUT operation not supported on /dishes");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, 
	(req, res, next) => {

		Favorites.remove({user: req.user._id})
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);	
		}, (err) => next(err))
		.catch((err) => next(err));

});


favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.cors, authenticate.verifyUser,(req,res,next) => {
	Favorites.findOne({user: req.user._id})
	.then((favorites) => {
		if(!favorites){  //if the dishId not present in favorites returns false
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			return res.json({"exists": false, "favorites": favorites});
		}
		else{
			if(favorites.dishes.indexOf(req.params.dishId) < 0){ //if the dishId not present in favorites returns false
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				return res.json({"exists": false, "favorites": favorites});
			}
			else{  //if the dishId present in favorites returns true
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				return res.json({"exists": true, "favorites": favorites});
			}	
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, 
	(req, res, next) => {
	
		Favorites.findOne({user: req.user._id})
		.then((favorite) => {
			if(favorite == null){

				favorite = {};
				favorite.user = req.user._id;
				favorite.dishes = [];
				favorite.dishes.push(req.params.dishId);  //pushes dish with specified dishId to the document

				Favorites.create(favorite)	
				.then((favorite) => {

					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);

				}, (err) => next(err));
			}
			else{	
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');

				if(favorite.dishes.indexOf(req.params.dishId) === -1){ //if the dish is not found already in the document then it is pushed to document
					favorite.dishes.push(req.params.dishId);

					favorite.save()
					.then((favorite) => {
						res.json(favorite);	
					}, (err) => next(err));
				}
				else{
					res.json(favorite);	
				}
			}

		}, (err) => next(err))
		.catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser,
	(req, res, next) => {

	res.statusCode = 403;
	res.end("PUT operation not supported on /favorites/:dishId");

})
.delete(cors.corsWithOptions, authenticate.verifyUser,
	(req, res, next) => {
		Favorites.findOne({user: req.user._id})
		.then((favorite) => {
			var index = favorite.dishes.indexOf(req.params.dishId);

			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');

			if(index > -1){
				favorite.dishes.splice(index, 1); //remove the dish with that index value, and 1 tells the quantity of dishes to be removed

				favorite.save()
				.then((favorite) => {
					Favorites.findById(favorite._id)
					.populate('user')
					.populate('dishes')
					.then((favorite) => {
						res.json(favorite);
					});	
				}, (err) => next(err));
			}
			else{
				res.json(favorite);
			}

		}, (err) => next(err))
		.catch((err) => next(err));
});


module.exports = favoriteRouter;
