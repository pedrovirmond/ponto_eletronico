// TO-DO:
// Organizar código-fonte,

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.closest();
})

const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}

let registerLocalStorage = getRegisterLocalStorage();

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");

const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto-fechar");

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();


// TO-DO:
// Por que esta função não retorna a localização?
// [doc]~

function getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => {
        return position;
    });
}

// TO-DO:
// Problema: os 5 segundos continuam contando

const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto");
btnCloseAlertRegister.addEventListener("click", () =>{
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {
    const typeRegister = document.getElementById("tipos-ponto");
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");

    console.log(lastTypeRegister);

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": getCurrentPosition(),
        "id": 1,
        "tipo": typeRegister.value
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();

    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);

});

function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto");
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister.value);
}

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if(!registers) {
        return [];
    }

    return JSON.parse(registers); // converte de JSON para Array

}

// TO-DO
// alterar o nome da função

function register(){
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();

    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister = document.getElementById("tipos-ponto");
        typeRegister.value = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    // TO-DO
    // Como "matar" o intervalo a cada vez que o dialog é fechado?
    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}

/*function getDateForForeigner(date1){
    const userLocale = navigator.language || 'en-US';
    const formattedDate = new Intl.DateTimeFormat(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date1)
    return formattedDate;
}

const date1 = new Date();
console.log(getDateForForeigner(date1));*/

function getWeekDay(){
    const date = new Date();
    let days = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
    return days [date.getDay()];
}


function getCurrentHour(){
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + String((date.getFullYear()).padStart(2,'0'));
}

function printCurrentHour(){
    horaMinSeg.textContent = getCurrentHour();
}

printCurrentHour();
setInterval(printCurrentHour,1000);