const express = require("express");
const wrapAsync = require("../utils/catchAsync.js");
const router = express.Router();
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage })
const Listing = require("../models/listing.js");



//used router.route method to group together routes with different verbs but same paths

//for index and create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("image"), wrapAsync(listingController.postList));


//New Route
router.get("/new", isLoggedIn , wrapAsync(listingController.new));

//for Show, Update, and Delete Route
router.route("/:id")
.get( wrapAsync(listingController.show))
.put(isLoggedIn, isOwner,upload.single("image"),validateListing,wrapAsync(listingController.putUpdate))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.delete));


//edit Route
router.get("/:id/edit",isOwner, wrapAsync(listingController.update));
module.exports = router;

//longer way of writing making the file look heavy
//Index Route 
// router.get("/", wrapAsync(listingController.index));
//Create Route
// router.post("/",validateListing, wrapAsync(listingController.postList));


// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync());

//Delete Route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));
//show route
// router.get("/:id", wrapAsync(listingController.show));


