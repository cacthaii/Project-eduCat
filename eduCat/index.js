// Setup express and ejs
var express = require ('express')
var ejs = require('ejs')
// Setup mysql
var mysql = require('mysql2');

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Setup body parser
app.use(express.urlencoded({ extended: true}));

// Setup CSS
app.use(express.static(__dirname + '/public'));

// Define database connection
/* 
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'educat_app',
    password: 'zxcvbnm',
    database: 'educat'
});
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

*/

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`"eduCat" app running on port ${port}!`))
