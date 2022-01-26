/*

Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
Добавить в чат механизм отправки гео-локации:
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести 
ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

*/





//Уважемый ментор, у меня отправляюстя сообзщения на сервер, но сервер мне не отвечает тем же сообщением, 
//не могу понять, это проблемы самого сервера или ошибка в коде. 

//По поводу ссылки на геопозицию возникли сложности, пару раз браузер отправлял мне сообщение с определением моей
//геопозиции, но в диалоговое окно ссылка не отправляется, подскажите пожалуйста, как правильно прописать код

const wsUri = "wss://echo-ws-service.herokuapp.com.";


function pageLoaded() {
    const infoOutput = document.querySelector(".info__output");
    const chatOutput = document.querySelector(".chat__output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn__send");
    const btnGeo = document.querySelector(".btn__geoLocation")
    
    let socket = new WebSocket(wsUri);
    
    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }
    
    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }
    
    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }
    
    sendBtn.addEventListener("click", sendMessage);
    
    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }
    
    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }

        //Для определения геопозиции

    btnGeo.addEventListener("click", sendMessageGeo);

    function sendMessageGeo () {
        if ("geolocation" in navigator) {
            let locationOptions = {
            enableHighAccuracy: true
            };
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
        } else {
            writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
        }
    }
    function locationSuccess() {
        let link = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
        websocket.send(link);
        showMessage(`<a href=${link} target="_blank">Ваша гео-локация</a>`, 'client');
    }
    function locationError() {
        writeOutput("При получении местоположения произошла ошибка");
    }
    

}

document.addEventListener("DOMContentLoaded", pageLoaded);