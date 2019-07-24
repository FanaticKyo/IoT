/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var loc = {'hostname': 'localhost', 'port': '9002'};

client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'TemperatureSubscriber');


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


client.connect({onSuccess: onConnect});

function onConnect() {
    console.log("connection established, subscribing to /pittsburgh/temperature");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var jsonString = JSON.parse(message.payloadString);

    if (message.destinationName == "pittsburgh/temperature/coldTemps") {
        document.getElementById("coldTemp").innerHTML = jsonString.temperature;
        document.getElementById("coldTempTime").innerHTML = new Date(jsonString.timestamp);
    } else if (message.destinationName == "pittsburgh/temperature/niceTemps") {
        document.getElementById("niceTemp").innerHTML = jsonString.temperature;
        document.getElementById("niceTempTime").innerHTML = new Date(jsonString.timestamp);
    } else if (message.destinationName == "pittsburgh/temperature/hotTemps") {
        document.getElementById("hotTemp").innerHTML = jsonString.temperature;
        document.getElementById("hotTempTime").innerHTML = new Date(jsonString.timestamp);
    }


}

function updateTemp(mes) {
    client.subscribe("pittsburgh/temperature/" + mes + "Temps");
}

function unsubscribe(mes) {
    client.unsubscribe("pittsburgh/temperature/" + mes + "Temps");
    if (mes == "cold") {
        document.getElementById("coldTemp").innerHTML = '';
        document.getElementById("coldTempTime").innerHTML = '';
    } else if (mes == "nice") {
        document.getElementById("niceTemp").innerHTML = '';
        document.getElementById("niceTempTime").innerHTML = '';
    } else if (mes == "hot") {
        document.getElementById("hotTemp").innerHTML = '';
        document.getElementById("hotTempTime").innerHTML = '';
    } else {
        client.unsubscribe("pittsburgh/temperature/+");
        document.getElementById("coldTemp").innerHTML = '';
        document.getElementById("coldTempTime").innerHTML = '';
        document.getElementById("niceTemp").innerHTML = '';
        document.getElementById("niceTempTime").innerHTML = '';
        document.getElementById("hotTemp").innerHTML = '';
        document.getElementById("hotTempTime").innerHTML = '';
    }
}

function updateAll(mes) {
    client.subscribe("pittsburgh/temperature/+");
}
