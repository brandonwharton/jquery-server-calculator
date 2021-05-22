console.log('js running');

$(handleReady);
// global variables
let currentCalculation = {};



function handleReady() {
    console.log('jquery running');
    // click listeners
    $('#add').on('click', operatorButton);
    $('#subtract').on('click', operatorButton);
    $('#multiply').on('click', operatorButton);
    $('#divide').on('click', operatorButton);
    
    
    $('#equals').on('click', checkEquals);
    $('#clear').on('click', clearButton);
    

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
    
    // load previous calculations

    historyRequest();
}

// checks the currentCalculation object and string to ensure proper syntax before running a POST request
function checkEquals () {
    // error message if full expression isn't used
    if (Object.keys(currentCalculation).length === 2 && !isNaN(Number(numString.charAt(numString.length-1)))  ) {
        console.log('Complete expression!!!');
        console.log('object inside of equals', currentCalculation);
    }
    else {
        console.log('Incomplete expression');
        console.log('object inside of equals', currentCalculation);
        return
    }
    // find the position of the operand in numString
    let operandPosition = numString.indexOf(currentCalculation.operation)
    console.log(operandPosition);

    // find the second number entered and add it's value to currenCalculation object
    let secondNumber = numString.substring(operandPosition+1);
    console.log(secondNumber);
    currentCalculation.number2 = secondNumber;
    
    // run equalsPost to POST data to server once object is checked and completed
    equalsPost();
}


function equalsPost() {
    // POST information to server
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: currentCalculation
    }).then( function (response) {
        console.log(response);

        // run functions to render DOM
        answerRequest();
        historyRequest();

        // reset everything using clearButton function
        clearButton();
        console.log('should be a cleared object', currentCalculation);
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong, try again;');
    })
}

function clearButton() {
    console.log('Clicked');
    // clear input, reset numString variable and currentCalculation object
    $('input').val('');
    numString = '';
    currentCalculation = {};
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




function decimalButton() {
    console.log('clicked');
    
}

let numString = "";

function numberButton() {
    // target the button that was pushed and hold it's text
    let clicked = $(this).text();
    // add text to numString for temporary holding
    numString += clicked;
    //show current numString in the display
    $('#numDisplay').val(numString);
}

function operatorButton() {
    // target the operator of the button that was clicked
    let clicked = $(this).text();
    
    console.log('object before logic:', currentCalculation);
    // disallow operand if no numbers have been input
    if (numString === '') {
        console.log('enter a number first');
        return;
    }
    // disallow operand if one has already been done
    if (Object.keys(currentCalculation).includes('operation')) {
        // Make this an error on DOM?
        console.log('Already have an operand');
        return;
    }
    // setting up object keys for information so far
    currentCalculation.number1 = numString
    currentCalculation.operation = clicked;
    
    console.log('object after logic', currentCalculation);
    numString += clicked;
    $('#numDisplay').val(numString);


    // if (!Number.isNaN(Number(numString))) {
    //     console.log(`It's a number!`);
    //     // set object values
    //     currentCalculation.number1 = numString
    //     currentCalculation.operation = clicked;
    //     numString += clicked;
    //     console.log('object inside logic', currentCalculation);
    //     console.log('numString inside logic', numString);
    // }
    // else {
    //     numString = numString.substring(0, numString.length - 1);
    //     console.log('numString inside else', numString);
    //     numString += clicked;
    //     currentCalculation.operation = clicked;
    //     console.log('object inside else', currentCalculation);
        
}



// // button functions that affect input
// function addButton() {
//     // set operator for current calculation
//     currentCalculation.operation = '+';
//     // clear all button highlights
//     buttonReset()
//     // highlight selected button
//     $(this).addClass('blueBtn');
//     // console.log('Operator:', currentCalculation.operation);
    
// }

// function subtractButton() {
//     // set operator for current calculation
//     currentCalculation.operation = '-';
//     // clear all button highlights
//     buttonReset()
//     // highlight selected button
//     $(this).addClass('blueBtn');
//     // console.log('Operator:', currentCalculation.operation);
// }

// function multiplyButton() {
//     // set operator for current calculation
//     currentCalculation.operation = '*';
//     // clear all button highlights
//     buttonReset()
//     // highlight selected button
//     $(this).addClass('blueBtn');
//     // console.log('Operator:', currentCalculation.operation);
// }

// function divideButton() {
//     // set operator for current calculation
//     currentCalculation.operation = '/';
//     // clear all button highlights
//     buttonReset()
//     // highlight selected button
//     $(this).addClass('blueBtn');
//     // console.log('Operator:', currentCalculation.operation);
// }