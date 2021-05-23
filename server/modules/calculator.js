module.exports = function (object) {
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