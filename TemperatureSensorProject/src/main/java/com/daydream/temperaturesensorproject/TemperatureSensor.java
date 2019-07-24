/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.daydream.temperaturesensorproject;

import java.util.Random;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
/**
 *
 * @author shengxu
 */
public class TemperatureSensor {
    public static void main(String[] args) throws InterruptedException {
        String topic;
        String content;
        int qos = 2;
        String broker = "tcp://localhost:1883";
        String clientId = "TemperatureSensor";

        try {
            MqttClient mqtt = new MqttClient(broker, clientId);  
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: "+broker);
            mqtt.connect(connOpts);
            System.out.println("Connected");
            
            do {
                double temp = new Random().nextDouble() * 100;

                if (temp <= 45) {
                    topic = "pittsburgh/temperature/coldTemps";
                } else if (temp <= 80) {
                    topic = "pittsburgh/temperature/niceTemps";
                } else {
                    topic = "pittsburgh/temperature/hotTemps";
                }

                content = "{\"temperature\": " + temp + ", " + "\"timestamp\": " + System.currentTimeMillis() + "}";
                MqttMessage message = new MqttMessage(content.getBytes());
                message.setQos(qos);
                mqtt.publish(topic, message);
                System.out.println("Publishing message: "+content);
                System.out.println("Message published");
                
                Thread.sleep(5000);
            } while(true);

        } catch (MqttException me) {
            System.out.println("reason " + me.getReasonCode());
            System.out.println("msg " + me.getMessage());
            System.out.println("loc " + me.getLocalizedMessage());
            System.out.println("cause " + me.getCause());
            System.out.println("excep " + me);
            me.printStackTrace();
        }

    
    }
}
