if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
} 
const express = require("express");
const methodoverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const listtings = require("./routes/listing.js");
const revview = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require("connect-mongo");

const app = express();
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
let port=8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});

const dbUrl= process.env.ATLASDB_URL;
main().then((data)=>{
    console.log("Connection is Successful");
}).catch((err)=>{console.log(err);});
async function main() {
await mongoose.connect(dbUrl)
}
const store = MongoStore.create ({
    mongoUrl : dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err)
})
const sessionOption = {
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge : 1000*60*60*24*7,
        httpOnly : true
    },
};

app.use(session(sessionOption))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings", listtings);
app.use("/listings/:id/reviews",revview);
app.use("/",userRouter);
app.get("/", (req, res) => {
    res.render("home");
});

app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}= err;
    console.error("Error details:", err);

    res.status(status).render("error.ejs", {err});
    // res.status(status).send(message);
})


 