// Create a new router
const express = require("express");
const router = express.Router();

// Define data
var siteName = {siteName: "eduCat"};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", siteName)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs", siteName)
}); 

router.get("/search", (req, res) => {
    res.render("search.ejs", siteName)
}); 

// Export the router object so index.js can access it
module.exports = router;
