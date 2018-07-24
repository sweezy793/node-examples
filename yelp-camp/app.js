var express=require('express');
var app=express();
var http=require('http');


app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    var campgrounds=[
        {name:"Salmon Creek",image:"https://www.flightnetwork.com/blog/wp-content/uploads/2017/06/Raquette-Lake-Camps-3-580x387.jpg"},
        {name:"Granite Hill",image:"https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_2592,h_1458,r_0,c_crop,q_60,fl_progressive/w_960,f_auto,c_fit/youreka/Camp-Kambre_hcemsr"},
        {name:"Mountain Goat",image:"https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2014/03/summer-camps-gurgaon.jpg"}
    ]
    res.render("campgrounds",{campgrounds:campgrounds});
});

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});