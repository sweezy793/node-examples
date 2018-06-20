const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });//add in every file which shows error in $pushAll


mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                $set:{description:'Updated Test'},
            },{
                new:true
            }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating:5,
                comment:'I\'m getting a skinny feeling',
                author:'Leonardo di Carpaccio'
            });

            return dish.save();
        })
        .then((dish)=>{

            console.log(dish);

            return db.collection('dishes').drop();
        })
        .then(() => {
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        });

});