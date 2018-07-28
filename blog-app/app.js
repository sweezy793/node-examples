var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var http=require('http');

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"));

var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{
        type:Date,
        default:Date.now
    }
});
var Blog=mongoose.model("Blog",blogSchema);

app.get("/",(req,res)=>{
    res.redirect("/blogs");
});

app.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err)
        console.log("Error");
        else
        res.render("index",{blogs:blogs});
    });
});

app.get("/blogs/new",(req,res)=>{
    res.render("new");
});

app.post("/blogs",(req,res)=>{
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err)
        res.render("new");
        else
        res.redirect("/blogs");
    });
});


http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});