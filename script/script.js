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

let operationStack,
    evaluationEnd = false,
    numberRegExp = /^\d+$/;


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
    } else if (numberRegExp.test(key)) {
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
}

function btnPress(event) {
    const listOfOperations = ["+", "-", "x", "\u00f7"];
    const content = event.currentTarget.textContent;
    if (listOfOperations.includes(content)) {
        operationInput(content);
    } else if (numberRegExp.test(content)) {
        if (!evaluationEnd) {
            currentText.textContent += content;
        } else {
            currentText.textContent = content;
            evaluationEnd = false;
        }

    }
}

function operationInput(operation) {
    let equation = currentText.textContent.replace(/\s/g, "");
    operationStack = operation;
    previousText.textContent = equation + operation;
    currentText.textContent = "";
}




function evaluateExpression() {
    const currentItem = currentText.textContent.replace(/\s/g, "");
    const previousItem = previousText.textContent;
    let equation = previousItem + currentItem;
    const [val1, val2] = equation.split(operationStack);
    let result;
    if (!isNaN(+val1) && !isNaN(+val2) && operationStack) {
        result = new Calculator(+val1, +val2)[operationStack]();
    } else {
        result = NaN;
    }
    if (isNaN(result)) {
        previousText.textContent = NaN;
        currentText.textContent = NaN;
    } else {
        previousText.textContent = equation + "=";
        currentText.textContent = result;
    }
    operationStack = "";
    evaluationEnd = true;
}