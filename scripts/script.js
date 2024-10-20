const numbers = document.querySelectorAll(".number");
const expressionDisplay = document.querySelector(".expression-display");
const mathOperators = document.querySelectorAll(".math-operator");
const calculate = document.querySelector(".equals");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = null;

function add(a, b) {
    a = Number(a);
    b = Number(b);
    let c = a + b;
    return c;
}

function subtract(a, b) {
    a = Number(a);
    b = Number(b);
    let c = a - b;
    return c;
}

function multiply(a, b) {
    a = Number(a);
    b = Number(b);
    let c = a * b;
    return c;
}

function divide(a, b) {
    a = Number(a);
    b = Number(b);
    let c = a / b;
    return c;
}

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;

        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
    }
}

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (!firstNumber || firstNumber == "0") {
            firstNumber = number.textContent;
            expressionDisplay.value = firstNumber;
        } else if (!operator && firstNumber != "0") {
            firstNumber += number.textContent;
            expressionDisplay.value = firstNumber;
        } 
        else if (firstNumber && operator) {
            secondNumber += number.textContent;
            expressionDisplay.value = secondNumber;
        }
        console.log(number.textContent);
        
    })
})

mathOperators.forEach(mathOperator => {
    mathOperator.addEventListener("click", () => {
        if (secondNumber) {
            operate(operator, firstNumber, secondNumber);
            expressionDisplay.value = result;
            firstNumber = result;
            secondNumber = "";
        }
        operator = mathOperator.value;
    })
})

calculate.addEventListener("click", () => {
    if (!secondNumber) {
        operate(operator, result ?? firstNumber, firstNumber);
    } else {
        operate(operator, firstNumber, secondNumber);
        firstNumber = result;
    }
    expressionDisplay.value = result;
    secondNumber = "";
})

console.log(undefined ?? 7);
