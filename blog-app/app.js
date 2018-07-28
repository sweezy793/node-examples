var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var http=require('http');
var methodOverride=require('method-override');

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(methodOverride("_method"));

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
app.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)
        res.redirect("/blogs");
        else
        res.render("show",{blog:foundBlog});
    });
});

app.get("/blogs/:id/edit",(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)
        res.redirect("/blogs");
        else
        res.render("edit",{blog:foundBlog});
    });
});

app.put("/blogs/:id",(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err)
        res.redirect("/blogs");
        else
        res.redirect("/blogs/"+req.params.id);
    });
});
 


http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});