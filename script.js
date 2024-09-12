//theme
const toggleEl = document.querySelector(".themes__toggle");

const darkTheme = () => {
    toggleEl.classList.toggle("themes__toggle--isActive");
};

const acssesToggle = (event) => {
    if (event.key === "Enter") {
        darkTheme();
    }
};
toggleEl.addEventListener("keydown", acssesToggle);
toggleEl.addEventListener("click", darkTheme);

//claculation
let currentNum = "";
let storedNum = "";
let opreation = "";

const resultEl = document.querySelector(".calc__result");
const keyEl = document.querySelectorAll("[data-type]");

const screenUpdate = (value) => {
    resultEl.innerText = !value ? "0" : value;

}

const numBtnHandelr = (value) => {

    if (value === "." && currentNum.includes(".")) {
        return;

    }
    if (value === "0" && !currentNum) {
        return;

    }
    currentNum += value;
    screenUpdate(currentNum);
};
const resetBtnHandler = () => {
    currentNum = "";
    storedNum = "";
    opreation = "";
    screenUpdate(currentNum);
};

const deleteBtnHandler = () => {
    if (!currentNum || currentNum === "0") return;

    if (currentNum.length === 1) {
        currentNum = "";

    } else {
        currentNum = currentNum.substring(0, currentNum.length - 1);
    }
    screenUpdate(currentNum);
};

const executeOperation = () => {
    if (currentNum && storedNum && opreation) {
        switch (opreation) {
            case "-":
                storedNum = parseFloat(storedNum) - parseFloat(currentNum);
                currentNum = "";
                screenUpdate(storedNum);
                break;
            case "+":
                storedNum = parseFloat(storedNum) + parseFloat(currentNum);
                currentNum = "";
                screenUpdate(storedNum);
                break;
            case "/":
                storedNum = parseFloat(storedNum) / parseFloat(currentNum);
                currentNum = "";
                screenUpdate(storedNum);
                break;
            case "*":
                storedNum = parseFloat(storedNum) * parseFloat(currentNum);
                currentNum = "";
                screenUpdate(storedNum);
                break;

            default:
                break;
        }
    }
};

const opreationBtnHandler = (operationValue) => {
    if (!storedNum && !currentNum) return;

    if (currentNum && !storedNum) {
        storedNum = currentNum;
        currentNum = "";
        opreation = operationValue;

    } else if (storedNum) {
        opreation = operationValue;

        if (currentNum) executeOperation();
    }
};

const keyHandelr = (el) => {
    el.addEventListener("click", () => {
        const type = el.dataset.type;

        if (type === "number") {
            numBtnHandelr(el.dataset.value);
        }

        else if (type === "operation") {

            switch (el.dataset.value) {
                case "c":
                    resetBtnHandler();
                    break;
                case "Backspace":
                    deleteBtnHandler();
                    break;
                case "Enter":
                    executeOperation();
                    break;
                default:
                    opreationBtnHandler(el.dataset.value);

            }
        }
    });
};

keyEl.forEach(keyHandelr);

// use keyboard as input
const avilableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const avilableOperations = ["+", "-", "/", "*"];
const avlibleKays = [...avilableNumbers, ...avilableOperations, "Backspace", "Enter", "c"];

window.addEventListener("keydown", (event) => {

    withHover(event.key);

});

const withHover = (key) => {
    if (avlibleKays.includes(key)) {
        const elem = document.querySelector(`[data-value="${key}"]`);

        elem.classList.add("hover");
        elem.click();
        setTimeout(() => elem.classList.remove("hover"), 400);
        

    
}
};