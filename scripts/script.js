const container = document.querySelector(".container");
const numberInput = document.querySelectorAll(".number");
const decimalPoint = document.querySelector(".decimal-point");
const mathOperators = document.querySelectorAll(".math-operator");
const equalSign = document.querySelector(".equals");
const percentage = document.querySelector(".percentage");
const negate = document.querySelector(".negate");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const acceptedKeys = "0123456789.";
const acceptableOperators = "+-*/"

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
    if (firstNumber.length == 10 && !operator && !secondNumber) {
        return;
    } 

    if (secondNumber.length == 10) {
        return;
    }

    if (firstNumber == "Error") {
        firstNumber = input;
        displayOperation();
        return;
    }
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
    displayOperation();
    console.log(`${firstNumber} + ${operator} + ${secondNumber}`);
}

function calculate(num1, op, num2) {
    switch (op) {
        case "+":
            const added = add(num1, num2);
            solution = formatCalculation(added);
            break;
    
        case "-":
            const subtracted = subtract(num1, num2);
            solution = formatCalculation(subtracted);
            break;

        case "*":
            const multiplied = multiply(num1, num2);
            solution = formatCalculation(multiplied);
            break;

        case "/":
            const divided = divide(num1, num2);
            solution = formatCalculation(divided);
            break;
    }
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${solution}`)
    solution = solution.toString();
    firstNumber = solution;
    operator = firstNumber == "Infinity" ? "" : operator;
    secondNumber = "";
    displayOperation();
}

numberInput.forEach(item => {
    item.addEventListener("click", () => takeInput(item.textContent));
})

decimalPoint.addEventListener("click", () => takeInput(decimalPoint.textContent));

function handleMathOperators (item) {
    if (!operator) {
        operator = item;
    } else if (operator && firstNumber && !secondNumber) {
        operator = item;
    } else if (operator && secondNumber) {
        calculate(firstNumber , operator, secondNumber);
        operator = item;
    }
}

mathOperators.forEach(item => {
    item.addEventListener("click", () => handleMathOperators(item.value))
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
        let firstNumberPercent = Number(firstNumber) / 100;
        firstNumber = firstNumberPercent.toString();
        operator = "";
        displayOperation();
        firstNumber = "";
        return;
    } else if (firstNumber && secondNumber) {
        let secondNumberPercent = Number(secondNumber) / 100;
        secondNumber = secondNumberPercent.toString();
    }
    displayOperation();
})

negate.addEventListener("click", () => {
    if (firstNumber && !operator) {
        let firstNumberPercent = Number(firstNumber) * -1;
        firstNumber = firstNumberPercent.toString();
    } else if (firstNumber && operator && !secondNumber) {
        let firstNumberPercent = Number(firstNumber) * -1;
        firstNumber = firstNumberPercent.toString();
    } else if (firstNumber && secondNumber) {
        let secondNumberPercent = Number(secondNumber) * -1;
        secondNumber = secondNumberPercent.toString();
    }
    displayOperation();
})

function displayOperation() {
    if (!secondNumber) {
        display.value = firstNumber;
    } else {
        display.value = secondNumber;
    }
}

clear.addEventListener("click", () => {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    displayOperation();
})

function formatCalculation (number, maxDigits = 10) {
    const num = Number(number);
    if (!Number.isFinite(num)) {
        return "Error"
    }

    const isWholeNumber = Number.isInteger(num);
    const numStr = num.toString();

    if (isWholeNumber && numStr.length <= maxDigits) {
        return numStr;
    }

    if (Math.abs(num) >= Math.pow(10, maxDigits) || Math.abs(num) < Math.pow(10, -maxDigits)) {
        return num.toExponential(maxDigits - 6).replace(/\.?0+e/, "e");
    }

    if (isWholeNumber) {
        const parts = numStr.split(".");
        const integerPart = parts[0].length;
        const availableDecimalPlaces = maxDigits - integerPart - 1;

        if (availableDecimalPlaces > 0) {
            const rounded = Number(num.toFixed(availableDecimalPlaces));
            return rounded.toString()
        }
    }

    return num.toPrecision(maxDigits).replace(/\.?0+$/, "");
}

//accept keyboard inputs

document.addEventListener("keydown", (e) => {
    let key = e.key;   
    if (acceptedKeys.includes(key)) {
        takeInput(key)
    }
    if (acceptableOperators.includes(key)) {
        handleMathOperators(key);
    }
    if (key === "Enter") {
        calculate(firstNumber, operator, secondNumber)
    }
})