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
    $('#deleteHistory').on('click', deleteRequest);
    $('#historySection').on('click', '.historyItem', repeatCalculation);

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

    // disallow operand if no numbers have been input and display error message
    if (numString === '') {
        errorMessage('Enter a number first');
        return;
    }
    // disallow operand if one has already been clicked and display error message
    if (Object.keys(currentCalculation).includes('operation')) {
        errorMessage('Already have an operand');
        return;
    }
    // disallow operand if the last entry is a decimal
    if (numString.charAt(numString.length-1) === '.') {
        errorMessage('Please start with an interger or complete decimal');
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
            <h2 class="result">Result: ${response.answer}</h2>
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
            // set variables for each loop iteration
            let ans = calc.answer;
            let num1 = calc.number1;
            let num2 = calc.number2;
            let op = calc.operation;

            el.append(`
                <li class="historyItem" data-number1="${num1}" data-number2="${num2}" data-operation="${op}">
                    ${num1} ${op} ${num2} = ${ans}
                </li>
            `);
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
            // run answerRequest and historyRequest to update DOM
            $('#resultSection').empty();
            $('#resultSection').append(`
                <h2 class="result">Result: </h2>
            `)
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

function repeatCalculation () {
    console.log('Clicked!');
    // set currentCalculation to the data saved on the history li
    currentCalculation = $(this).data();

    // post the calculation again to repeat it
    equalsPost();
}

