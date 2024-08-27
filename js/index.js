const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent = "Domingo";
diaMesAno.textContent = getCurrentDate();
horaMinSeg.textContent = getCurrentHour();

function getCurrentHour(){
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

function getCurrentDate(){
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