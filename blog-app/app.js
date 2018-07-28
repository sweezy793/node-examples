var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var http=require('http');

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"));

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});