const body = document.querySelector("body");
const pPeso = document.querySelector("p");
const btnCalcular = document.querySelector("button");
const alert = document.querySelector(".alert");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const closeModal = document.querySelector("#close");

let campoIsNum = false;

const reset = (e) => {
    e.classList.remove("show");
}

function CalcularIMC() {
    const peso = parseFloat(document.querySelector("#peso").value.replace(',', '.'));
    const altura = parseFloat(document.querySelector("#altura").value.replace(',', '.'));

    if (isNaN(peso) || isNaN(altura)) {
        alert.classList.add("show");
        campoIsNum = false;

    } else {
        alert.classList.remove("show");
        campoIsNum = true;
    }

    if (campoIsNum) {
        modal.classList.add("show");
        bg.classList.add("show");

        let IMC = (peso / (altura * altura)).toFixed(2);

        pPeso.innerText = `Seu IMC é de ${IMC}`;

        closeModal.addEventListener("click", () => {
            modal.classList.remove("show");
            bg.classList.remove("show");
        });
    }
}

function keyEnter(event) {
    if (event.key === 'Enter') {
        CalcularIMC();
    }
}

btnCalcular.addEventListener("keypress", keyEnter);
btnCalcular.addEventListener("click", CalcularIMC);