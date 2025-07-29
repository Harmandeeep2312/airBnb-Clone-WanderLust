const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
main()
    .then(()=>{
    console.log("connected to DB");
}).catch((err)=>{console.log(err);

});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
};
 
const initDB = async ()=>{
    await Listing.deleteMany({})
    console.log(initdata.data);
    initdata.data = initdata.data.map((obj)=>({...obj, owner:"685c270b5c1ae0f989d942c2"}))
    await Listing.insertMany(initdata.data);
    console.log("data was initialised");
};
initDB();