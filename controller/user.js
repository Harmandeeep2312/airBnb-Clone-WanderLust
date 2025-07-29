const User = require("../models/user.js");
const Listing = require("../models/listing");

module.exports.renderUser = async(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.postUser = async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser = new User({email,username})
   let registeredUser= await User.register(newUser,password);
   req.login(registeredUser , (err)=>{
    if(err){
        next(err);
    }
   req.flash("success", "Welcome To WanderLust");
   return res.redirect("/listings");
   });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
};
module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login = (req,res)=>{
    req.flash("success","Welcome To WanderLust");
    let redirectUrl = req.session.returnTo || "/listings"
    console.log(redirectUrl)
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
        req.flash("success","Logged you Out");
        res.redirect("/listings");
    });
}