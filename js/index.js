const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("bater-ponto")
btnBaterPonto.addEventListener("click", register);

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

function getDateForForeigner(date1){
    const userLocale = navigator.language || 'en-US';
    const formattedDate = new Intl.DateTimeFormat(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date1)
    return formattedDate;
}

const date1 = new Date();
console.log(getDateForForeigner(date1));

function getWeekDay(){
    const date = new Date();
    let days = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
    return days [date.getDay()];
}


function getCurrentHour(){
    // Considerar os metodos abaixo para incluir numeros < 10
    // padStart
    // slice()
    // formatos de hora considerando localidade do usuario
    const hora = new Date();
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
    return hour + ":" + min + ":" + sec;
}

function printCurrentHour(){
    horaMinSeg.textContent = getCurrentHour();
}

function getCurrentDate(){
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes de data, conforma localização
    // do usuario dd/mm/yyyy, mm/dd/yyyy, yyyy/mm/dd
    // Verificar se no Date()
    const date = new Date();
   let mes = date.getMonth();
   let dia = date.getDate();
   if (dia < 10) {
        dia = "0" + dia
   }
   if (mes < 10) {
        mes = "0" + (mes+1)
   }
   return dia + "/" + mes + "/" + date.getFullYear(); 
}

function register(){
    // Abrir <dialog> com no minimo quatro butões
    
    alert("Bater Ponto!");
}

setInterval(printCurrentHour,1000);