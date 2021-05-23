console.log('js running');

$(handleReady);
// global variables
let currentCalculation = {};
let numString = "";


function handleReady() {
    // click listeners by category

    // numbers
    $('#decimal').on('click', numberButton);
    $('#zero').on('click', numberButton)
    $('#one').on('click', numberButton)
    $('#two').on('click', numberButton)
    $('#three').on('click', numberButton)
    $('#four').on('click', numberButton)
    $('#five').on('click', numberButton)
    $('#six').on('click', numberButton)
    $('#seven').on('click', numberButton)
    $('#eight').on('click', numberButton)
    $('#nine').on('click', numberButton)

    // operators
    $('#add').on('click', operatorButton);
    $('#subtract').on('click', operatorButton);
    $('#multiply').on('click', operatorButton);
    $('#divide').on('click', operatorButton);

    // commands
    $('#equals').on('click', checkEquals);
    $('#clear').on('click', clearButton);
    $('#historySection').on('click', '#deleteHistory', deleteRequest)

    // load previous calculations on page refresh
    historyRequest();
}


// handle all number buttons and the decimal button
function numberButton() {
    // target the button that was pushed and add it's value to numString
    numString += $(this).text();

    //show current numString in the display above the calculator
    $('#numDisplay').val(numString);
}


// handle all operand buttons
function operatorButton() {

    // disallow operand if no numbers have been input or last input is a decimal point and display error message
    if (numString === '' || numString.charAt(numString.length-1) === '.') {
        errorMessage('Enter an integer or complete decimal');
        return;
    }
    // disallow operand if one has already been clicked and display error message
    if (Object.keys(currentCalculation).includes('operation')) {
        errorMessage('Already have an operand')
        return;
    }

    // store the value of the clicked operand
    let clicked = $(this).text();

    // set up object keys for information input so far
    currentCalculation.number1 = numString
    currentCalculation.operation = clicked;

    // console.log('object after logic', currentCalculation);
    // add the clicked operand to numString and display on DOM
    numString += clicked;
    $('#numDisplay').val(numString);
}


// checks the currentCalculation object and string to ensure proper syntax before running a POST request
function checkEquals() {
    // checks for a full expression entered, gives an error if not
    //       makes sure two keys exist                     makes sure there are numbers after the operand
    if (Object.keys(currentCalculation).length === 2 && !isNaN(Number(numString.charAt(numString.length - 1)))) {
        // find the position of the operand in numString
        let operandPosition = numString.indexOf(currentCalculation.operation)

        // find the second number entered and add it's value to currenCalculation object
        let secondNumber = numString.substring(operandPosition + 1);
        console.log(secondNumber);
        currentCalculation.number2 = secondNumber;

        // run equalsPost to POST data to server once object is checked and completed
        equalsPost();
    }
    else {
        // display error message
        errorMessage('Incomplete/Incorrect expression');
    }
}


function equalsPost() {
    // POST information to server
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: currentCalculation
    }).then(function (response) {
        // run functions to render DOM
        answerRequest();
        historyRequest();

        // reset everything using clearButton function
        clearButton();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}


function clearButton() {
    console.log('Clicked');
    // clear input, reset both numString variable and currentCalculation object, and error messages
    $('input').val('');
    numString = '';
    currentCalculation = {};
    $('#errorSection').empty();
}


// GET requests
function answerRequest() {
    console.log('Requested Answer');
    // get answer to most recent calculation from server
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        // target results area on DOM
        let el = $('#resultSection');
        // empty the results area
        el.empty();
        // append recent calculation answer to results area
        el.append(`
            <h2>Result: ${response.answer}</h2>
        `);
    }).catch(function (error) {
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
    }).then(function (response) {
        // target history area on DOM
        let el = $('#historySection');
        // empty history area
        el.empty();
        // append history to DOM by looping through history response
        response.forEach(calc => {
            el.append(`
                <li>${calc.number1} ${calc.operation} ${calc.number2} = ${calc.answer}</li>
                <button id="deleteHistory">Delete History</button>
            `)
        }) // end forEach
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}


function deleteRequest() {
    console.log('Requested a delete to /history');
    
    $.ajax({
        url: '/history',
        type: 'DELETE',
        success: (function (response) {
            console.log(response);
            // run a historyRequest to update DOM
            historyRequest();      
        })
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    });
}

function errorMessage(input) {
    // empty any previous error messages
    $('#errorSection').empty();
    // append error message
    $('#errorSection').append(`
        <h5>${input}</h5>
    `);
}