/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var wsUri = "ws://" + document.location.host + document.location.pathname + "cartendpoint";
var websocket = new WebSocket(wsUri);

websocket.onerror = function(evt) { onError(evt) };

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onopen = function(evt) {
    console.log("refresh cart");
    websocket.send("{\"action\": \"add\",\"item\": \"refresh the cart\"}");
};
                
function onMessage(evt) {
    console.log("received: " + evt.data);
    updateCart(JSON.parse(evt.data));
}

function sendData(evt) {
    console.log("send: " + evt);
    websocket.send(evt);
}