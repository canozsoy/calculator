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