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

    // Fetch the question with module_id
    const questionQuery = `
        SELECT question_id, module_id, question_text, question_type 
        FROM questions 
        WHERE question_id = ?
    `;

    // Fetch answers for the question
    const answerQuery = `
        SELECT answer_id, answer_text, is_correct
        FROM answers 
        WHERE question_id = ?
    `;

    db.query(questionQuery, [questionId], (err, questionResult) => {
        if (err) {
            console.error('Question query error:', err);
            return res.status(500).send("Database error");
        }

        if (!questionResult.length) {
            return res.status(404).send("Question not found");
        }

        const question = questionResult[0];

        db.query(answerQuery, [questionId], (err, answerResults) => {
            if (err) {
                console.error('Answers query error:', err);
                return res.status(500).send("Database error");
            }

            console.log('Question:', question);
            console.log('Answers:', answerResults);

            const newData = Object.assign({}, siteName, {
                question,
                answers: answerResults,
            });

            res.render("question-page", newData);
        });
    });
});

router.post('/check-answer', (req, res) => {
    console.log('Received request body:', req.body);

    const { question_id, question_type, module_id } = req.body;

    console.log('Multiple Choice - Answer ID:', req.body.answer_id);
    console.log('Single Choice - Answer:', req.body.answer);

    let checkAnswerQuery, values;

    if (question_type === 'multiple_choice') {
        // For multiple choice, check by answer_id
        const answer_id = req.body.answer_id;
        console.log('Multiple Choice - Answer ID:', answer_id);
        checkAnswerQuery = `
            SELECT is_correct 
            FROM answers 
            WHERE answer_id = ? AND question_id = ?
        `;
        values = [answer_id, question_id];
    } else if (question_type === 'single_choice') {
        // For single choice, check by exact answer_text
        const answer = req.body.answer;
        console.log('Single Choice - Answer:', answer);
        checkAnswerQuery = `
            SELECT is_correct 
            FROM answers 
            WHERE answer_text = ? AND question_id = ?
        `;
        values = [answer, question_id];
    } else {
        console.error('Invalid question type');
        return res.status(400).send("Invalid question type");
    }

    console.log('Query:', checkAnswerQuery);
    console.log('Values:', values);

    db.query(checkAnswerQuery, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send("Database error");
        }

        console.log('Query result:', result);

        if (result.length > 0 && result[0].is_correct) {
            // Correct answer - find next question in the same module
            const nextQuestionQuery = `
                SELECT question_id 
                FROM questions 
                WHERE module_id = ? AND question_id > ? 
                ORDER BY question_id ASC 
                LIMIT 1
            `;

            db.query(nextQuestionQuery, [module_id, question_id], (err, nextQuestion) => {
                if (err) {
                    console.error('Next question query error:', err);
                    return res.status(500).send("Database error");
                }

                const nextQuestionId = nextQuestion.length > 0 ? nextQuestion[0].question_id : null;

                console.log('Rendering correct-answer, next question:', nextQuestionId);
                res.render('correct-answer', {
                    siteName,
                    nextQuestionId,
                    module_id, // Pass module_id to the template
                });
            });
        } else {
            // Incorrect answer
            console.log('Rendering incorrect-answer for question:', question_id);
            res.render('incorrect-answer', {
                siteName,
                question_id,
            });
        }
    });
});


// Export the router object so index.js can access it
module.exports = router;
