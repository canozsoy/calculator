// Select event targets

const currentText = document.querySelector("#currentProcess");
const previousText = document.querySelector("#previousProcess");
const deleteBtn = document.querySelector("#deleteBtn");
const clearBtn = document.querySelector("#clearBtn");
const computationBtn = document.querySelectorAll(".computationBtn");
const equalBtn = document.querySelector("#equalBtn");

// Add event listeners

window.addEventListener("keyup", onKeyUp);
deleteBtn.addEventListener("click", deleteLast);
clearBtn.addEventListener("click", clearAll);
computationBtn.forEach(x => x.addEventListener("click", btnPress));
equalBtn.addEventListener("click", evaluateExpression);

// Calculator

class Calculator {
    constructor(val1, val2) {
        this.val1 = val1;
        this.val2 = val2;
    }
    "+"() {
        return this.val1 + this.val2;
    }
    "-"() {
        return this.val1 - this.val2;
    }
    x() {
        return this.val1 * this.val2;
    }
    "\u00f7"() {
        return this.val1 / this.val2;
    }
}

let numberStack = [],
    operationStack = [],
    numberRegExp = /^\d+$/,
    evaluationEnd = false;

function onKeyUp(event) {
    let key = event.key;
    const listOfOperations = ["+", "-", "*", "/"];
    if (key === "Backspace") {
        deleteLast();
    } else if (listOfOperations.includes(key)) {
        if (key === "*") {
            key = "x";
        } else if (key === "/") {
            key = "\u00f7";
        }
        operationInput(key);
    } else if (numberRegExp.test(key) || (key === "." && !currentText.textContent.includes("."))) {
        if (!evaluationEnd) {
            currentText.textContent += key;
        } else {
            currentText.textContent = key;
            evaluationEnd = false;
        }

    } else if (key === "=" || key === "Enter") {
        evaluateExpression();
    }
}

function deleteLast() {
    currentText.textContent = currentText.textContent.slice(0, -1);
}

function clearAll() {
    currentText.textContent = "";
    previousText.textContent = "";
    numberStack = [];
    operationStack = [];
}

function btnPress(event) {
    const listOfOperations = ["+", "-", "x", "\u00f7"];
    const content = event.currentTarget.textContent;
    if (listOfOperations.includes(content)) {
        operationInput(content);
    } else if (numberRegExp.test(content) || (content === "." && !currentText.textContent.includes("."))) {
        if (!evaluationEnd) {
            currentText.textContent += content;
        } else {
            currentText.textContent = content;
            evaluationEnd = false;
        }

    }
}

function operationInput(operation) {
    let numbers = currentText.textContent.replace(/\s/g, "");
    numberStack.push(numbers);
    operationStack.push(operation);
    previousText.textContent = numbers + operation;
    currentText.textContent = "";
}

function evaluateExpression() {
    let finalNumber = currentText.textContent.replace(/\s/g, "");
    if (!finalNumber) {
        numberStack.push(NaN);
    } else {
        numberStack.push(finalNumber);
    }
    let result,
        equation = "";
    for (let i = 0, n = operationStack.length; i < n; i++) {
        if (i === 0) {
            result = new Calculator(+numberStack[i], +numberStack[i + 1])[operationStack[i]]();
        } else {
            result = new Calculator(result, +numberStack[i + 1])[operationStack[i]]();
        }
        equation += numberStack[i] + operationStack[i];
    }
    
    if (!result) {
        result = finalNumber;
    }
    previousText.textContent = equation + finalNumber + "=";
    currentText.textContent = result;
    evaluationEnd = true;
    numberStack = [];
    operationStack = [];
}