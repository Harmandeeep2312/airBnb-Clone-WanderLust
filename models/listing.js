const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")
const listSchema = new  Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image:{
        filename:String,
        url:String,
    },
    price:{
        type: Number 
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
],
owner :{
    type:Schema.Types.ObjectId,
    ref:"User",
}, 
geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
}

});
listSchema.post("findOneAndDelete", async(review)=>{
    if(review){
    await Review.deleteMany({_id : {$in: listSchema.reviews}});
    }
})
const Listing =mongoose.model("Listing",listSchema);
module.exports = Listing;