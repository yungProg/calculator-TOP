const numberInput = document.querySelectorAll(".number");
const decimalPoint = document.querySelector(".decimal-point");
const mathOperators = document.querySelectorAll(".math-operator");
const equalSign = document.querySelector(".equals");
const percentage = document.querySelector(".percentage");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let solution = "";

function add(a, b) {
    [a, b] = [Number(a), Number(b)];
    c = a + b;
    return c;
}

function subtract(a, b) {
    [a, b] = [Number(a), Number(b)];
    c = a - b;
    return c;
}

function multiply(a, b) {
    [a, b] = [Number(a), Number(b)];
    c = a * b;
    return c;
}

function divide(a, b) {
    [a, b] = [Number(a), Number(b)];
    c = a / b;
    return c;
}

function takeInput(input) {
    if (!firstNumber && !operator) {
        if (input === ".") {
            firstNumber = "0.";
        } else {
            firstNumber = input;
        }
    } else if (firstNumber && !operator) {
        if (input === "." && firstNumber.includes(".")) {
            return;
        }
        if (firstNumber === "0") {
            firstNumber = input;
        } else {
            firstNumber += input;
        }
    } else if (firstNumber && operator && !secondNumber) {
        if (input === ".") {
            secondNumber = "0.";
        } else {
            secondNumber = input;
        }
    } else if (firstNumber && operator && secondNumber) {
        if (input === "." && secondNumber.includes(".")) {
            return;
        }
        if (secondNumber === "0") {
            secondNumber = input;
        } else {
            secondNumber += input;
        }
    }
    console.log(`${firstNumber} + ${operator} + ${secondNumber}`);
}

function calculate(num1, op, num2) {
    switch (op) {
        case "+":
            solution = add(num1, num2);
            break;
    
        case "-":
            solution = subtract(num1, num2);
            break;

        case "*":
            solution = multiply(num1, num2);
            break;

        case "/":
            solution = divide(num1, num2);
            break;
    }
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${solution}`)
    solution = solution.toString();
    firstNumber = solution;
    secondNumber = "";
}

numberInput.forEach(item => {
    item.addEventListener("click", () => takeInput(item.textContent))
})
decimalPoint.addEventListener("click", () => takeInput(decimalPoint.textContent))

mathOperators.forEach(item => {
    item.addEventListener("click", () => {
        if (!operator) {
            operator = item.value;
        } else if (operator && firstNumber && !secondNumber) {
            operator = item.value;
        } else if (operator && secondNumber) {
            calculate(firstNumber , operator, secondNumber);
            operator = item.value;
        }
    })
})

equalSign.addEventListener("click", () => {
    if (!secondNumber) {
        return;
    } else {
        calculate(firstNumber, operator, secondNumber);
    }
})

percentage.addEventListener("click", () => {
    if (firstNumber && !operator) {
        let firstNumberPercent = Number(firstNumber) / 100;
        firstNumber = firstNumberPercent.toString();
    } else if (firstNumber && operator && !secondNumber) {
        let firstNumberPercent = Number(secondNumber) / 100;
        firstNumber = firstNumberPercent.toString();
        operator = "";
    } else if (firstNumber && secondNumber) {
        let secondNumberPercent = Number(secondNumber) / 100;
        secondNumber = secondNumberPercent.toString();
    }
})