const expressionDisplay = document.querySelector(".expression-display");
const resultDisplay = document.querySelector(".result-display");
const numbers = document.querySelectorAll(".number");
const mathOperators = document.querySelectorAll(".math-operator");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = null;

function displayExpression() {
    expressionDisplay.value = firstNumber + operator + secondNumber;
}

function displayResult(convertedOperator) {
    convertedOperator
    switch (operator) {
        case "÷":
            convertedOperator = "/";
            break;
    
        case "×":
            convertedOperator = "*";
            break;
        default:
            convertedOperator = operator;
    }
    result = Function(`return ${firstNumber}${convertedOperator}${secondNumber}`)();
    console.log(result);
    resultDisplay.value = result;
}

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(!firstNumber && number.textContent != "0") {
            firstNumber = number.textContent;
        } else if (firstNumber && !operator) {
            firstNumber += number.textContent;
        } else if (firstNumber && operator) {
            secondNumber += number.textContent;
            displayResult(operator);
        }
        displayExpression();
    })
})

mathOperators.forEach(mathOperator => {
    mathOperator.addEventListener("click", () => {
        if(firstNumber && !secondNumber) {
            operator = mathOperator.textContent;
        }
        if(secondNumber) {
            operator = mathOperator.textContent;
            firstNumber = firstNumber + operator + secondNumber;
            secondNumber = "";
        }
        displayExpression();
    })
})