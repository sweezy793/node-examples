var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require("body-parser");
var mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));




//Schema
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String
});

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
//     name:"Salmon Creek",
//     image:"https://www.flightnetwork.com/blog/wp-content/uploads/2017/06/Raquette-Lake-Camps-3-580x387.jpg" 
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
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
    
});

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    Campground.create(newCampground,(err,newlyCreated)=>{
        if(err)
        console.log(err);
        else
        res.redirect("/campgrounds");
    });   
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});