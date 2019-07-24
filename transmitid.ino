// This #include statement was automatically added by the Particle IDE.
#include <MQTT.h>

void callback(char* topic, byte* payload, unsigned int length) {}
// user IP address
byte server[] = { 172, 29, 80, 124 };
// create the client
MQTT client(server, 1883, callback);

void setup() {
    // control the LED light
    RGB.control(true);
    // connect to the MQTT broker
    client.connect("TransmitIDMQTT");
}

void loop() {
    // check id the connection is established
    if (client.isConnected()) {
        // send the json string to MQTT broker
        client.publish("student/id","{\"name\":\"Sheng Xu\", \"URL\":\"http://www.andrew.cmu.edu/user/shengxu\"}");
        // set the LED light color to sky blue
        RGB.color(135, 206, 250);
        // last for one second
        delay(1000);
        // turn off the LED light
        RGB.color(0, 0, 0);
        // add extra 4 seconds to make the photon send message every 5 seconds
        delay(4000);
        // call the client.loop() to execute the command continuesly
        client.loop();
    }
    else {
        // try to reconnect the server
        client.connect("TransmitIDMQTT");
    }
        
    }
