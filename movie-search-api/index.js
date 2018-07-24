var express=require('express');
var app=express();
var http=require('http');
var request=require('request');
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    res.render("search");
})
app.get("/results",(req,res)=>{
    var query=req.query.search;
    request("http://www.omdbapi.com/?s="+query+"&apikey=thewdb",(error,response,body)=>{
        if(!error&&response.statusCode==200)
        {
            var data=JSON.parse(body);
            res.render("results",{data:data});
        }
    })
})


http.createServer(app).listen("3000",()=>{
    console.log("Server running");
});