var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

var campgrounds=[
    {name:"Salmon Creek",image:"https://www.flightnetwork.com/blog/wp-content/uploads/2017/06/Raquette-Lake-Camps-3-580x387.jpg"},
    {name:"Granite Hill",image:"https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_2592,h_1458,r_0,c_crop,q_60,fl_progressive/w_960,f_auto,c_fit/youreka/Camp-Kambre_hcemsr"},
    {name:"Mountain Goat",image:"https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2014/03/summer-camps-gurgaon.jpg"}
]

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds"); 
    
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});