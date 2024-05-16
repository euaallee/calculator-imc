const app = document.querySelector("#app");
let isOpenModal = false;

const verifyInput = (input) => {
    return input.value.trim() === '';
}

const validateInput = (input, alertBox) => {
    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            input.style.border = ".2rem solid red";
        } else {
            input.style.border = "";
            if (alertBox && !verifyInput(input)) {
                alertBox.remove();
            }
        }
    })
}

const validateValue = (value, type) => {
    let isValid = true;
    let message = "";

    if (type === "weight") {
        if (value <= 0 || value > 500) {
            isValid = false;
            message = "Peso deve ser entre 0 e 500 kg.";
        }
    } else if (type === "height") {
        if (value <= 0 || value > 3) {
            isValid = false;
            message = "Altura deve ser entre 0 e 3 metros.";
        }
    }

    return { isValid, message };
}

function initCalculator() {
    const calculatorLayout = document.createElement("div");
    const title = document.createElement("h1");
    const groupWeigth = document.createElement("div"), groupHeigth = document.createElement("div");
    const labelWeigth = document.createElement("label"), labelHeigth = document.createElement("label");
    const inputWeigth = document.createElement("input"), inputHeigth = document.createElement("input");
    const buttonCalculator = document.createElement("button");

    calculatorLayout.className = "layoutCalculator";
    title.textContent = "Cálculo de IMC";
    groupWeigth.className = "weigth";
    labelWeigth.innerText = "Peso (kg)";
    inputWeigth.type = "number";
    inputWeigth.step = "0.01";
    inputWeigth.required = true;
    groupHeigth.className = "heigth";
    labelHeigth.innerText = "Altura (m)";
    inputHeigth.type = "number";
    inputHeigth.step = "0.01";
    inputHeigth.required = true;

    buttonCalculator.innerText = `Calcular IMC`;
    buttonCalculator.className = "btnCalc";
    buttonCalculator.addEventListener("click", () => {
        console.log("CLICADO!!");

        const wEmpty = verifyInput(inputWeigth);
        const hEmpty = verifyInput(inputHeigth);

        const weightValue = Number(inputWeigth.value);
        const heightValue = Number(inputHeigth.value);

        const weightValidation = validateValue(weightValue, "weight");
        const heightValidation = validateValue(heightValue, "height");

        if (!wEmpty && !hEmpty && weightValidation.isValid && heightValidation.isValid) {
            modal(calculatorImc(weightValue, heightValue));
            inputWeigth.value = "";
            inputHeigth.value = "";
        } else {
            const alertBox = alertErro(weightValidation.message, heightValidation.message);
            validateInput(inputWeigth, alertBox);
            validateInput(inputHeigth, alertBox);
            if (wEmpty || !weightValidation.isValid) { inputWeigth.style.border = ".2rem solid red"; };
            if (hEmpty || !heightValidation.isValid) { inputHeigth.style.border = ".2rem solid red"; };
        }
    });

    calculatorLayout.appendChild(title);
    groupWeigth.appendChild(labelWeigth);
    groupWeigth.appendChild(inputWeigth);
    calculatorLayout.appendChild(groupWeigth);
    groupHeigth.appendChild(labelHeigth);
    groupHeigth.appendChild(inputHeigth);
    calculatorLayout.appendChild(groupHeigth);
    calculatorLayout.appendChild(buttonCalculator);

    app.appendChild(calculatorLayout);
}

function calculatorImc(weigth, heigth) {
    let imc = (weigth / (heigth * heigth)).toFixed(2);
    console.log(imc);
    return imc;
}

function alertErro(weightMessage, heightMessage) {
    const alertBox = document.createElement("div");
    const alertMsg = document.createElement("p");

    alertBox.className = "alertBox";
    alertMsg.className = "alertMsg";

    if (weightMessage) {
        alertMsg.innerText = weightMessage;
    } else if (heightMessage) {
        alertMsg.innerText = heightMessage;
    } else {
        alertMsg.innerText = "Preencher corretamente os campos";
    }

    alertBox.appendChild(alertMsg);
    app.appendChild(alertBox);

    return alertBox;
}

function modal(imc) {
    if (isOpenModal) return;

    const backgroundDown = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("span");
    const msgModal = document.createElement("p");

    backgroundDown.className = "backModal";
    modal.className = "modal";
    close.className = "closeModal";
    close.innerText = "×";
    close.addEventListener("click", () => {
        backgroundDown.remove();
        isOpenModal = false;
    });
    backgroundDown.addEventListener("click", (e) => {
        if (e.target === backgroundDown) {
            backgroundDown.remove();
            isOpenModal = false;
        }
    });

    msgModal.className = "msgModal";
    msgModal.innerText = `Seu IMC é de ${imc}`;

    modal.appendChild(close);
    modal.appendChild(msgModal);
    backgroundDown.appendChild(modal);
    app.appendChild(backgroundDown);

    isOpenModal = true;
}

initCalculator();
