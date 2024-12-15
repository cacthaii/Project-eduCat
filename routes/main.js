// Create a new router
const express = require("express");
const router = express.Router();

// Define data
var siteName = {siteName: "eduCat"};

// Handle the main routes
router.get('/', (req, res) => {
    res.render("index.ejs", siteName)
}); 

router.get('/about', (req, res) => {
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

router.get('/search', (req, res) => {
    // Query for module names
    const moduleQuery = 'SELECT module_name FROM modules';

    // Query for unique difficulty levels
    const difficultyQuery = 'SELECT DISTINCT difficulty FROM questions';

    // Execute both queries and render the form
    db.query(moduleQuery, (err, modules) => {
        if (err) throw err;

        db.query(difficultyQuery, (err, difficulties) => {
            if (err) throw err;

            let newData = Object.assign({}, siteName, { modules, difficulties });
            res.render("search", newData); // Pass siteName, modules, and difficulties to the search template
        });
    });
});


router.get('/search-results', (req, res) => {
    const { module_name, difficulty } = req.query;

    // Query to get questions based on the selected module and difficulty
    const query = `
        SELECT q.question_id, q.question_text
        FROM questions q
        JOIN modules m ON q.module_id = m.module_id
        WHERE m.module_name = ? AND q.difficulty = ?
    `;
    const values = [module_name, difficulty];

    db.query(query, values, (err, results) => {
        if (err) throw err;

        let newData = Object.assign({}, siteName, {
            questions: results,
            module_name,
            difficulty,
        });
        res.render("search-results", newData); // Pass siteName, questions, module_name, and difficulty to the search-results template
    });
});

router.get('/question/:id', (req, res) => {
    const questionId = req.params.id;

    // Fetch the question
    const questionQuery = `
        SELECT question_text, question_type 
        FROM questions 
        WHERE question_id = ?
    `;

    // Fetch answers for the question
    const answerQuery = `
        SELECT answer_text 
        FROM answers 
        WHERE question_id = ?
    `;

    db.query(questionQuery, [questionId], (err, questionResult) => {
        if (err) throw err;

        if (!questionResult.length) {
            return res.status(404).send("Question not found");
        }

        const question = questionResult[0];

        db.query(answerQuery, [questionId], (err, answerResults) => {
            if (err) throw err;

            const newData = Object.assign({}, siteName, {
                question,
                answers: answerResults,
            });

            res.render("question-page", newData);
        });
    });
});


// Export the router object so index.js can access it
module.exports = router;
