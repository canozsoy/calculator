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
        currentText.textContent += key;
    } else if (/\d+/.test(key)) {
        currentText.textContent += key;
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
    const content = event.currentTarget.textContent;
    currentText.textContent += content;
}

function equationParser(expression) {
    const operationPrecedance = ["-", "+", "x", "\u00f7"];
    expression = expression.replace(/s/g);
    const asdf = new Calculator(2, 2);
    console.log(asdf);

}

function evaluateExpression() {
    let equation = currentText.textContent;
    equationParser(equation);
    previousText.textContent = currentText.textContent;
}