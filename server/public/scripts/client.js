console.log('js running');

$(handleReady);
// global variables
let currentCalculation = {};
let answer;


function handleReady() {
    console.log('jquery running');
    // click listeners
    $('#add').on('click', addButton);
    $('#subtract').on('click', subtractButton);
    $('#multiply').on('click', multiplyButton);
    $('#divide').on('click', divideButton);
    $('#equals').on('click', equalsButton);
    $('#clear').on('click', clearButton);


}


// all button functions
function addButton() {
    // set operator for current calculation
    currentCalculation.operation = '+';
    // console.log('Operator:', currentCalculation.operation);
    
}

function subtractButton() {
    // set operator for current calculation
    currentCalculation.operation = '-';
    // console.log('Operator:', currentCalculation.operation);
}

function multiplyButton() {
    // set operator for current calculation
    currentCalculation.operation = '*';
    // console.log('Operator:', currentCalculation.operation);
}

function divideButton() {
    // set operator for current calculation
    currentCalculation.operation = '/';
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
        // run function to render DOM
        answerRequest();
        console.log('Answer is:', answer);
        
        // answerRequest();
        // historyRequest();
        // clear inputs and empty object for next calculation
        $('input').val('');
        currentCalculation = {};
        console.log('should be a cleared object', currentCalculation);
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    })
}

function clearButton() {
    console.log('Clicked');
    
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
        // set answer
        answer = response.answer;
        // append recent calculation answer to DOM
        
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
        // append history to DOM

    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}