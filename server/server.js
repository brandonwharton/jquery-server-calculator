// global variables and server requirements
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// placeholder for calculation history
let history = [];
// import calculator function from its script
const theCalculator = require('./modules/calculator.js');

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
    // run theCalculator on the POSTED data and save it to calcInfo
    calcInfo.answer = theCalculator(calcInfo);

    // push calcInfo object to history
    history.push(calcInfo);
    res.sendStatus(200);
});

// DELETE requests
app.delete('/history', (req, res) => {
    // reset the history array when delete request is made
    history = [];
    res.send('Deleted history from server')
})


app.listen(process.env.PORT || 5000, () => {
    console.log('NOW RUNNING ON PORT:', 5000);
});


