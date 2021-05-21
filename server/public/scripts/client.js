console.log('js running');

$(handleReady);
// global variables
const currentCalculation = {};


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
    console.log('Clicked');
    
}

function subtractButton() {
    console.log('Clicked');
    
}

function multiplyButton() {
    console.log('Clicked');
    
}

function divideButton() {
    console.log('Clicked');
    
}

function equalsButton() {
    console.log('Clicked');
    
}

function clearButton() {
    console.log('Clicked');
    
}