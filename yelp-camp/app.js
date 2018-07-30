var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require("body-parser");
var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment=require('./models/comment');
var seedDB=require('./seeds');


seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));




//Schema


// Campground.create({
//     name:"Salmon Creek",
//     image:"https://www.flightnetwork.com/blog/wp-content/uploads/2017/06/Raquette-Lake-Camps-3-580x387.jpg",
//     description:"A great camp!" 
// },(err,campground)=>{
//     if(err)
//     console.log(err);
//     else
//     console.log(campground);
// });

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    Campground.find({},(err,allCampgrounds)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc};
    Campground.create(newCampground,(err,newlyCreated)=>{
        if(err)
        console.log(err);
        else
        res.redirect("/campgrounds");
    });   
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/' + campground._id);
            }
         });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
 });

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});