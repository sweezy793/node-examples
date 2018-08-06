var express=require('express');
var router=express.Router({mergeParams:true});
var Campground=require('../models/campground');
var Comment=require('../models/comment');

//comments new

router.get("/new",isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//comments create
router.post("/",isLoggedIn, function(req, res){
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
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/' + campground._id);
            }
         });
        }
    });
 });
//Comment edit route
 router.get("/:comment_id/edit",checkCommentOwnership,(req,res)=>{
     Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
     });
 });

 //Comment update
 router.put("/:comment_id",checkCommentOwnership,(req,res)=>{
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
         if(err)
         {
             res.redirect("back");
         }
         else{
             res.redirect("/campgrounds/"+req.params.id);
         }
     })
 })


 //Comment destroy route
router.delete("/:comment_id",checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


 function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}


function checkCommentOwnership(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err)
            res.redirect("back");
            else{
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();   
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
       
        res.redirect("back");
    }
}

 module.exports=router;