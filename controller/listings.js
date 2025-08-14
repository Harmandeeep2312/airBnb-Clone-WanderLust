const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});
const catchAsync = require("../utils/catchAsync");
module.exports.index = catchAsync(async(req,res)=>{
    let list = await Listing.find({})
    return res.render("listings/listingss.ejs",{list});
}) 
module.exports.new = catchAsync(async(req,res)=>{
    return res.render("listings/new.ejs")
})
module.exports.show = catchAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path: "reviews", populate: {
        path:"author"}}).populate("owner");
    if(!list){
        req.flash("error","Listing u r trying to access is not available");
        return res.redirect("/listings");
    }
    return res.render("listings/show.ejs",{list});
})
module.exports.postList = catchAsync(async (req, res) => {
    console.log("Map Token:", process.env.MAP_TOKEN ? "Present" : "Missing");
console.log("Cloudinary Storage Config:", storage);
console.log("Uploaded File:", req.file);
       console.log("Uploaded File:", req.file);
    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    // ✅ Check for location result
    if (!response.body.features.length) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect("/listings/new");
    }

    // ✅ Check for image upload
    if (!req.file) {
        req.flash("error", "Image upload failed. Please upload an image.");
        return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;
    const newlist = new Listing(req.body.listing);
    newlist.owner = req.user._id;
    newlist.image = { url, filename };
    newlist.geometry = response.body.features[0].geometry;

    await newlist.save();
    req.flash("success", "New Listing Created");
    return res.redirect("/listings");
});
module.exports.update = catchAsync(async (req,res)=>{
    let {id} = req.params;
    let List = await Listing.findById(id);
     if(!List){
        req.flash("error","Listing u r trying to access is not available");
        return res.redirect("/listings");
    }
    let originalurl= List.image.url.replace("/upload", "/upload/h_300,w_250");
     return res.render("listings/edit.ejs",{List, originalurl});
})
module.exports.putUpdate = catchAsync(async(req,res)=>{
     let {id} = req.params;
     if (typeof req.body.image === 'string') {
        req.body.image = {
            url: req.body.image,
            filename: "listingimage" // Use existing or default filename
        };
    }
    let editedList= await Listing.findByIdAndUpdate(id,{...req.body});
    if(typeof req.file !== "undefined"){

    let url = req.file.path;
    let filename = req.file.filename;
    editedList.image= {url, filename}
    await editedList.save();
    }
    req.flash("success","Listing Updated");
   return res.redirect("/listings")
})
module.exports.delete = catchAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
   return res.redirect("/listings");
}) 