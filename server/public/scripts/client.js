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
}


// all button functions
function addButton() {
    // set operator for current calculation
    currentCalculation.operation = '+';
    console.log('Operator:', currentCalculation.operation);
    
}

function subtractButton() {
    // set operator for current calculation
    currentCalculation.operation = '-';
    console.log('Operator:', currentCalculation.operation);
}

function multiplyButton() {
    // set operator for current calculation
    currentCalculation.operation = '*';
    console.log('Operator:', currentCalculation.operation);
}

function divideButton() {
    // set operator for current calculation
    currentCalculation.operation = '/';
    console.log('Operator:', currentCalculation.operation);
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

        // clear inputs and empty object for next calculation
        // needs testing
        $('input').val('');
        currentCalculation = {};
        console.log('should be a cleared object', currentCalculation);
        
    })
}

function clearButton() {
    console.log('Clicked');
    
}

// server requests
