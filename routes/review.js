const express = require("express");
const wrapAsync = require("../utils/error.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const methodoverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const ejsMate = require("ejs-mate");
const Review = require("../models/reviews.js");
const router = express.Router({mergeParams:true});
const {isLoggedIn,isAuthor} = require("../middleware.js");
router.use(methodoverride("_method"));
const reviewcontroller = require("../controller/reviews.js");
//reviews
const validateReview =(req,res, next) => {
     let {error} = reviewSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400,error);
     } else{ 
        next()
     }}

router.post("/", isLoggedIn,validateReview, wrapAsync(reviewcontroller.postReview));


//delete review


router.delete("/:reviewId", isLoggedIn,isAuthor,wrapAsync(reviewcontroller.delete)) 


module.exports = router;