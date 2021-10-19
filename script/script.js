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
    add() {
        return this.val1 + this.val2;
    }
    subtract() {
        return this.val1 - this.val2;
    }
    multiply() {
        return this.val1 * this.val2;
    }
    divide() {
        return this.val1 / this.val2;
    }
}


function onKeyUp(event) {
    const key = event.key;
}

function deleteLast() {
    currentText.textContent = currentText.textContent.slice(0, -1);
}

function clearAll() {
    currentText.textContent = "";
    previousText.textContent = "";
}

function btnPress(event) {
    const content = event.currentTarget.textContent;
    currentText.textContent += content;
}

function evaluateExpression() {
    let equation = currentText.textContent;
    equation = equation.replace(/\s/g);
    console.log(equation)
    previousText.textContent = equation;
}