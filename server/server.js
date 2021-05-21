// global variables and server requirements
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const PORT = 5000;

// placeholder for calculation info and history
let calculationInfo = {};
let history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// GET requests
app.get('/calculation', (req, res) => {
    console.log('getting from /calculation');
    // make an answer object and run calculations
    let answer = {
        answer: theCalculator(calculationInfo)
    };

    res.send(answer);
    // reset info object for next calculation
    calculationInfo = {};
})

app.get('/history', (req, res) => {
    console.log('getting from /history');

    res.send(history);
})

// POST requests
app.post('/calculation', (req, res) => {
    console.log('posting to /calculation', req.body);
    // store calculation information to server
    calculationInfo = req.body;
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log('NOW RUNNING ON PORT:', PORT);
});


// calculation function
function theCalculator(object) {
    // set variables for the two numbers chosen
    let num1 = Number(object.number1);
    let num2 = Number(object.number2);
    // use a switch to do the actual math
    switch (object.operation) {
        case '+':
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case '*':
            return num1 * num2;
            break;
        case '/':
            return num1 / num2;
            break;
        default:
            console.log('Something went wrong in calculation');
            break;
    }
}