//* this lab will be focusing on "Clothing" theme to practice on Mongoose, Express, and EJS to a real-world-like scenario.

////////////////////////
// Setup - Import deps and create app object
////////////////////////
const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");


const Shirt = require("./models/shirt.js");

// connect MongoDB using my password in evn file
mongoose.connect(process.env.MONGODB_URI);


//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({ extended: false }));
//! what else???
app.use(methodOverride("_method"));
//! why??

///////////////////////
// Declare Routes and Routers 
///////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/shirts/new", (req, res) => {
    res.render("shirts/new.ejs")
})

// INDUCES - Index, New, Delete, Update, Create, Edit, Show
app.post("/shirts", async (req, res) => {
    if (req.body.wantedToBuy === "on") {
        req.body.wantedToBuy = true;
    } else {
        req.body.wantedToBuy = false;
    }
    console.log(req.body)
    await Shirt.create(req.body)
    res.redirect("/shirts/new")
})

app.get("/shirts", async (req,res) => {
    const allShirts = await Shirt.find();
    console.log(allShirts)
    res.render("shirts/index.ejs", {allShirts})
})

app.get("/shirts/:shirtId", async (req,res) => {
    const foundShirt = await Shirt.findById(req.params.shirtId)
    res.render("shirts/show.ejs", {foundShirt})

})

app.get("/shirts/:shirtId/edit", async (req,res) => {
    const foundShirt = await Shirt.findById(req.params.shirtId)
    res.render("shirts/edit.ejs", {foundShirt})

})

app.put("/shirts/:shirtId", async(req,res) => {
    if(req.body.wantedToBuy === "on") {
        req.body.wantedToBuy = true;
    } else {
        req.body.wantedToBuy = false;
    }

    await Shirt.findByIdAndUpdate(req.params.shirtId, req.body);

    res.redirect(`/shirts/${req.params.shirtId}`);
})



///////////////////////////
// Server Listener
///////////////////////////
app.listen(4000, () => {
    console.log("Listening on port 4000");
  });

