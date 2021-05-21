// global variables and server requirements
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(PORT, () => {
    console.log('NOW RUNNING ON PORT:', PORT);
});