const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let streak = 0;
let leaderboards = [];
let currentQuestion;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 + num2;
    const options = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 2
    ].sort(() => Math.random() - 0.5); // Shuffle options

    return {
        text: `What is ${num1} + ${num2}?`,
        answer: correctAnswer,
        options: options
    };
}

app.get('/', (req, res) => {
    res.render('home', { streak });
});

app.get('/quiz', (req, res) => {
    currentQuestion = generateQuestion();
    res.render('quiz', { question: currentQuestion });
});

app.post('/quiz', (req, res) => {
    const userAnswer = parseInt(req.body.answer);
    if (userAnswer === currentQuestion.answer) {
        streak++;
    } else {
        streak = 0; // Reset streak on wrong answer
    }
    res.redirect('/completion');
});

app.get('/completion', (req, res) => {
    res.render('completion', { streak });
});

app.get('/leaderboards', (req, res) => {
    res.render('leaderboards', { leaderboards });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
