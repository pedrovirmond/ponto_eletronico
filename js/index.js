const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () =>{
    dialogPonto.close();
});

// TO DO:
// A data e hora do dialog devem ser atualizadas automaticamente
// a hora a cada segundo e a data sempre 00:00:00
// o setInterval do dialog tem que ser desativado ao fechar o dialog

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = "Hora: " + getCurrentHour();


diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) =>{
        return position;
    });
}

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {

    let dataAtual = getCurrentDate();
    let horaAtual = getCurrentHour();
    let localizacao = getCurrentPosition();
    let tipoPonto = document.getElementById("tipos-ponto").value;

    let ponto = {
        "data": dataAtual,
        "hora": horaAtual,
        "localizacao": localizacao,
        "id": 1,
        "tipo": tipoPonto
    }

    console.log(ponto);

    saveRegisterLocalStorage(JSON.stringify(ponto));

    dialogPonto.close();

    // TO-DO:
    // Fechar o dialog ao bater o ponto e apresentar, de alguma forma
    // uma confirmação (ou não) para o usuário

});

function saveRegisterLocalStorage(register) {
    // TO-DO:
    // salvar array de objetos
    localStorage.setItem("register", register);
}

function register() {
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
    // TO-DO:
    // Considerar os metodos abaixo para incluir numeros < 10
    // padStart
    // slice()
    // formatos de hora considerando localidade do usuario
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
    
    /*const hora = new Date();
    let hour = hora.getHours();
    let min = hora.getMinutes();
    let sec = hora.getSeconds();
    if (hour < 10) {
        hour = "0" + hour
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    return hour + ":" + min + ":" + sec;*/

function getCurrentDate() {
    // TO-DO:
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes de data, conforma localização
    // do usuario dd/mm/yyyy, mm/dd/yyyy, yyyy/mm/dd
    // Verificar se no Date() há algum método que possa auxiliar
    // locale
    const date = new Date();
   let month = date.getMonth();
   let day = date.getDate();
   if (day < 10) {
        day = "0" + day
   }
   if (month < 10) {
        month = "0" + (month+1)
   }
   return day + "/" + month + "/" + date.getFullYear(); 
}

/*function register(){
    // Abrir <dialog> com no minimo quatro butões
    
    alert("Bater Ponto!");
}*/

function printCurrentHour(){
    horaMinSeg.textContent = getCurrentHour();
}

setInterval(printCurrentHour,1000);