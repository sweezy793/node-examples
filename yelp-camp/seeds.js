var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac semper magna. Sed laoreet lorem tempor mauris iaculis eleifend. Proin facilisis tempor nibh, sed sagittis enim ornare non. Praesent quis sapien purus. Praesent non semper nibh. Phasellus vulputate varius enim, at auctor elit euismod quis. Morbi eu mi sit amet lorem mollis consequat. Nullam vel condimentum nisl. Etiam pretium lectus in arcu tempor, sed fringilla velit feugiat. Sed a ullamcorper velit. In facilisis feugiat tincidunt. Nam et magna ac urna imperdiet mollis. Nulla aliquet justo in erat fermentum, ut malesuada justo commodo."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        //  //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
}

module.exports = seedDB;
