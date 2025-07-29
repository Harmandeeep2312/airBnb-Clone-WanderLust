const Listing = require("./models/listing.js")
const Review = require("./models/reviews.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You Must Be LoggedIn To Create Listing");
        return res.redirect("/login");
    }
    next(); 
};
module.exports.saveRedirectUrl = (req,res,next)=>{
   console.log(req.session.returnTo);
    if(req.session.returnTo){
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

module.exports.isOwner = async (req,res,next) =>{
     let {id} = req.params;
        let listing = await Listing.findById(id);
         if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You cannot update this listing as it is not owned by you");
            return res.redirect(`/listing/${id}`);
        }
        next()
}
module.exports.validateListing = (req,res, next) => {
     let {error} = listingSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400,errMsg);
     } else{ 
        next()
     }
};
module.exports.isAuthor = async (req,res,next) =>{
     let {id, reviewId} = req.params;
        let review = await Review.findById(reviewId);
         if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","You cannot Delete this review as it is not owned by you");
            return res.redirect(`/listings/${id}`);
        }
        next()
}