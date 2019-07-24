/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var loc = {'hostname': 'localhost', 'port': '9002'};

client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'PhotonSubscriber');


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


client.connect({onSuccess: onConnect});

function onConnect() {
    client.subscribe("student/id");
    console.log("connection established, subscribing to /student/id");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var stu_json = JSON.parse(message.payloadString);
    var messageLine = document.getElementById('student_info');
    var newmsg = document.createElement("p");
 
    newmsg.innerHTML = "<b>Name: </b>"+stu_json.name+"  <b>, URL: </b>  "+stu_json.URL;
    messageLine.append(newmsg);
}

