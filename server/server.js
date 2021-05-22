// global variables and server requirements
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const PORT = 5000;

// placeholder for calculation history
let history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// GET requests
app.get('/calculation', (req, res) => {
    console.log('getting from /calculation');
    // grab most recent answer to send to client.js
    res.send(history[history.length-1]);
})

app.get('/history', (req, res) => {
    console.log('getting from /history');
    // send back full history array
    res.send(history);
})

// POST requests
app.post('/calculation', (req, res) => {
    console.log('posting to /calculation', req.body);
 
    // store calculation information on server
    let calcInfo = req.body;
    let answer = {
        answer: theCalculator(calcInfo),
        number1: calcInfo.number1,
        number2: calcInfo.number2,
        operation: calcInfo.operation
    };

    // push answer object to history
    history.push(answer);
    res.sendStatus(200);
});

// DELETE requests
app.delete('/history', (req, res) => {
    history = [];
    res.send('Deleted history from server')
})


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