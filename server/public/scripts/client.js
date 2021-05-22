console.log('js running');

$(handleReady);
// global variables
let currentCalculation = {};



function handleReady() {
    console.log('jquery running');
    // click listeners
    $('#add').on('click', addButton);
    $('#subtract').on('click', subtractButton);
    $('#multiply').on('click', multiplyButton);
    $('#divide').on('click', divideButton);
    $('#equals').on('click', equalsButton);
    $('#clear').on('click', clearButton);
    // load previous calculations
    historyRequest();
}


// all button functions
function addButton() {
    // set operator for current calculation
    currentCalculation.operation = '+';
    // clear all button highlights
    buttonReset()
    // highlight selected button
    $(this).addClass('blueBtn');
    // console.log('Operator:', currentCalculation.operation);
    
}

function subtractButton() {
    // set operator for current calculation
    currentCalculation.operation = '-';
    // clear all button highlights
    buttonReset()
    // highlight selected button
    $(this).addClass('blueBtn');
    // console.log('Operator:', currentCalculation.operation);
}

function multiplyButton() {
    // set operator for current calculation
    currentCalculation.operation = '*';
    // clear all button highlights
    buttonReset()
    // highlight selected button
    $(this).addClass('blueBtn');
    // console.log('Operator:', currentCalculation.operation);
}

function divideButton() {
    // set operator for current calculation
    currentCalculation.operation = '/';
    // clear all button highlights
    buttonReset()
    // highlight selected button
    $(this).addClass('blueBtn');
    // console.log('Operator:', currentCalculation.operation);
}

function equalsButton() {
    // gather information to send to server
    currentCalculation.number1 = $('#num1').val();
    currentCalculation.number2 = $('#num2').val();
    console.log('Numbers chosen: ', currentCalculation);
    // make sure an operator was selected and both inputs full
    if (Object.values(currentCalculation).includes('') || Object.keys(currentCalculation).length !== 3) {
        console.log('insufficient inputs');
        return;
    }
    // POST information to server
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: currentCalculation
    }).then( function (response) {
        console.log(response);
        // take away button highlight
        buttonReset();
        // run functions to render DOM
        answerRequest();
        historyRequest();

        // reset calculation object here in case C button isn't pressed first
        currentCalculation = {};

        console.log('should be a cleared object', currentCalculation);
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    })
}

function clearButton() {
    console.log('Clicked');
    // clear inputs and turn off operand highlight
    $('input').val('');
    buttonReset();
}


// server requests
function answerRequest() {
    console.log('Requested Answer');
    // get answer to most recent calculation from server
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then( function (response) {
        console.log(response);
       
        let el = $('#resultSection'); 
        // empty the results area
        el.empty();
        // append recent calculation answer to DOM
        el.append(`
            <h2>Result: ${response.answer}</h2>
        `);
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}

function historyRequest() {
    console.log('Requested History');
    // get updated history list from the server
    $.ajax({
        type: 'GET',
        url: '/history'
    }).then( function (response) {
        console.log(response);
        
        let el = $('#historySection');
        // empty history from DOM
        el.empty();
        // append history to DOM by looping through history response
        response.forEach (calc => {
            el.append(`
                <li>${calc.number1} ${calc.operation} ${calc.number2} = ${calc.answer}</li>
            `)
        }) // end forEach
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}

function buttonReset() {
    $('button').removeClass('blueBtn')
}