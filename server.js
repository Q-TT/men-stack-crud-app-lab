//* this lab will be focusing on "Clothing" theme to practice on Mongoose, Express, and EJS to a real-world-like scenario.

////////////////////////
// Setup - Import deps and create app object
////////////////////////
const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");



const Shirt = require("./models/shirt.js");

// connect MongoDB using my password in evn file
mongoose.connect(process.env.MONGODB_URI);


//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({ extended: false }));
//! what else???

///////////////////////
// Declare Routes and Routers 
///////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/shirts/new", (req, res) => {
    res.render("shirts/new.ejs")
})

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
    res.render("shirts/index.ejs", {allShirts})
})

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

///////////////////////////
// Server Listener
///////////////////////////
app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

