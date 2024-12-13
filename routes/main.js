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
    let sqlquery = "SELECT * FROM modules"; // query database to get all the modules
    // Execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); 
        }
        let newData = Object.assign({}, siteName, {availableModules:result});
        console.log(newData)
        res.render("about.ejs", newData)
        
    });
}); 

router.get("/search", (req, res) => {
    res.render("search.ejs", siteName)
}); 

// Export the router object so index.js can access it
module.exports = router;
