var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');
var Comment=require('../models/comment');
var middleware=require("../middleware");


router.get("/",(req,res)=>{
    Campground.find({},(err,allCampgrounds)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });
    
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={name:name,image:image,description:desc,author,author};
    Campground.create(newCampground,(err,newlyCreated)=>{
        if(err)
        console.log(err);
        else
        res.redirect("/campgrounds");
    });   
});

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
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

//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{    
        Campground.findById(req.params.id,(err,foundCampground)=>{
         res.render("campgrounds/edit",{campground:foundCampground});    
        });
});

router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
        if(err)
        {
            res.redirect("/campgrounds");
        }
        
        else{
            res.redirect("/campgrounds/"+req.params.id);    
        }
    });
});

//Destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        res.redirect("/campgrounds");   
    })
})


//middleware


// function checkCampgroundOwnership(req,res,next)
// {
//     if(req.isAuthenticated())
//     {
//         Campground.findById(req.params.id,(err,foundCampground)=>{
//             if(err)
//             res.redirect("back");
//             else{
//                 if(foundCampground.author.id.equals(req.user._id))
//                 {
//                     next();   
//                 }
//                 else{
//                     res.redirect("back");
//                 }
//             }
//         });
//     }
//     else{
       
//         res.redirect("back");
//     }
// }

module.exports=router;