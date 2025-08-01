const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/error.js");
const passport = require("passport");
const {saveRedirectUrl, isLoggedIn} = require("../middleware.js");
const userController = require("../controller/user.js");


router.route("/signup")
.get( userController.renderUser )
.post( wrapAsync(userController.postUser))

router.route("/login")
.get(userController.renderLogin)
.post( saveRedirectUrl, passport.authenticate("local" , {failureRedirect: "/login",failureFlash: true}), userController.login)

// router.get("/signup" , userController.renderUser )
// router.post("/signup", wrapAsync(userController.postUser))

//login

router.get("/login",userController.renderLogin);

router.post("/login", saveRedirectUrl, passport.authenticate("local" , {failureRedirect: "/login",failureFlash: true}), userController.login)

//logout

router.get("/logout" , userController.logout);
module.exports = router;