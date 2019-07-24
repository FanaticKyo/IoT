/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// the location of the MQTT broker
var loc = {'hostname' : 'localhost', 'port' : '9002' };
// create a new MQTT client
client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'MouseTrackerPublisher');
// condition when connection is lost
client.onConnectionLost = onConnectionLost;
// condition when the connection is established
client.connect({onSuccess:onConnect});
// things to do when connecting to the MQTT broker
function onConnect() {
    console.log("Connection established");
}

// things to do when the connection is lost
 function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
 }
// the transmit function
function transmit(msg) {
     message = new Paho.MQTT.Message(msg);
     message.destinationName = "/mouseTracker";
     // set qos to 1
     message.qos = 1;
     message.retained = true;
     client.send(message);
}


// send function
function send(x, y) {
 
    var message = '{"x":"' + x + '","y":"'+ y +'"}';
    transmit(message);
    
}



