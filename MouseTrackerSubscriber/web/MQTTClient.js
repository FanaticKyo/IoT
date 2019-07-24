/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var loc = {'hostname' : 'localhost', 'port' : '9002' };

client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'MouseTrackerSubscriber');


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


client.connect({onSuccess:onConnect});

function onConnect() {
    console.log("connection established, subscribing to /mouseTracker");
    client.subscribe("/mouseTracker", {qos: 1});
}

function onConnectionLost(responseObject) {
   if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
   }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var jsonString = JSON.parse(message.payloadString);
    var messageLine = document.getElementById('coor');
    var newmsg = document.createElement("p");
 
    newmsg.innerHTML = "<b>Coordinates Received:(</b>"+jsonString.x+"  <b>, </b>  "+jsonString.y+")";
    messageLine.append(newmsg);
 
    
}



