var express = require('express');
var router = express.Router();

const upload=require("./multer");
var userModel=require("./users");
var postModel=require("./post");
var express = require('express')
var router = express.Router();
var passport = require('passport')
var localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
var newUser = {
username:req.body.username,

name:req.body.name,

 profileImage:req.body.profileImage,
email:req.body.email,
};
userModel
.register(newUser, req.body.password)
.then((result) => {
passport.authenticate('local')(req, res, () => {
res.redirect('/profile');
});
})
.catch((err) => {
res.send(err);
});
});


router.get('/register', (req, res, next) => {
 res.render("register")
})




router.post(
'/login',
passport.authenticate('local', {
successRedirect: '/profile',
failureRedirect: '/',
}),
(req, res, next) => {}
);


router.get('/login', (req, res, next) => {
res.render("profile")
})


function isloggedIn(req, res, next) {
if (req.isAuthenticated()) return next();
else res.redirect('/');

}


router.get('/logout', (req, res, next) => {
if (req.isAuthenticated())
req.logout((err) => {
if (err) res.send(err);
else res.redirect('/');
});
else {
res.redirect('/');
}
});
router.get('/',isloggedIn, function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.post('/fileupload',isloggedIn,upload.single("image"),async function(req, res, next) {
 var user=await userModel.findOne({username:req.session.passport.user});
 user.profileImage=req.file.filename;
 await user.save();
 res.redirect("/profile");

});

router.get('/add',isloggedIn, function(req, res, next) {
  res.render('add');
});


router.post('/createpost',isloggedIn,upload.single("postimage"),async function(req, res, next) {
var user= await userModel.findOne({username:req.session.passport.user});

  var post= await postModel.create({

    title:req.body.title,
description:req.body.description,
image:req.file.filename,
user:user._id,

  })

  user.userposts.push(post._id);
  await user.save();
 
  res.redirect("/profile");
 
});


router.get('/profile',isloggedIn,async (req, res, next) => {
  var user= await userModel.findOne({username:req.session.passport.user}).populate("userposts").populate("saved");
  console.log(user);
  res.render("profile",{user})
 })

 router.get('/allposts',isloggedIn,async (req, res, next) => {
  var user= await userModel.findOne({username:req.session.passport.user}).populate("userposts");
  res.render("allposts",{user})
 })


 router.get('/feed',isloggedIn,async (req, res, next) => {
  var user= await userModel.findOne({username:req.session.passport.user});
  var posts= await postModel.find().populate("user");



  res.render("feed",{user,posts});
 
 })

 
 router.get('/feed/:PostId',isloggedIn,async (req, res, next) => {
  var user= await userModel.findOne({username:req.session.passport.user}).populate("userposts");
  var post= await postModel.findOne({_id:req.params.PostId}).populate("user");

  res.render("pins",{user,post});
  

 


  
 })



 router.get('/delete/:PostId',isloggedIn,async (req, res, next) => {
  
   await postModel.findOneAndDelete({_id:req.params.PostId});

   res.redirect("back"); 
 })




 // save posts



 router.get('/save/:PostId',isloggedIn,async (req, res, next) => {

  let user= await userModel.findOne({username:req.session.passport.user});


  if(user.saved.indexOf(req.params.PostId) == -1){
    user.saved.push(req.params.PostId);

  }
  else{
    user.saved.splice(user.saved.indexOf(req.params.PostId),1)
  }
   await user.save();
  //  console.log(user);
   res.redirect("back");
})



// rendering saved page


router.get('/mysavedpins',isloggedIn,async (req, res, next) => {

  // let user= await userModel.findOne({username:req.session.passport.user}).populate("saved");



// ----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
const loguser = await userModel.findOne({ username: req.session.passport.user })
.populate({
  path: 'saved',
  populate: {
    path: 'user', // This will populate the user field inside each Post
    model: 'user' // Ensure you specify the model name if necessary
  }
});
// console.log(loguser.saved[0]._id);
  res.render("saved",{user:loguser});
  
  
})




module.exports = router;
