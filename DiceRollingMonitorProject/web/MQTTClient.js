/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

google.charts.load('current', {'packages': ['gauge']});
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawGauge);
var gaugeData;
var sumGaugeData;
var gauge;
var chart;
var sumGauge;

var gaugeOptions = {min: 1, max: 6, minorTicks: 1};
var sumGaugeOptions = {min: 2, max: 12, minorTicks: 1};

function drawGauge() {
    gaugeData = new google.visualization.DataTable();
    gaugeData.addColumn('number', 'Die1');
    gaugeData.addColumn('number', 'Die2');
    gaugeData.addRows(2);
    gaugeData.setCell(0, 0, 0);
    gaugeData.setCell(0, 1, 0);

    sumGaugeData = new google.visualization.DataTable();
    sumGaugeData.addColumn('number', 'Sum');
    sumGaugeData.addColumn('number', 'Avg');
    sumGaugeData.addRows(2);
    sumGaugeData.setCell(0, 0, 0);
    sumGaugeData.setCell(0, 1, 0);


    gauge = new google.visualization.Gauge(document.getElementById('gauge_div'));
    gauge.draw(gaugeData, gaugeOptions);

    sumGauge = new google.visualization.Gauge(document.getElementById('sum_gauge_div'));
    sumGauge.draw(sumGaugeData, sumGaugeOptions);

    client.subscribe("dicerolling");
    console.log("connection established, subscribing to /dicerolling");


}

var loc = {'hostname': 'localhost', 'port': '9002'};
var n = 1;
var sum = 0;
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var f = 0;
var g = 0;
var h = 0;
var i = 0;
var j = 0;
var k = 0;


client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'DiceRolling');


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


client.connect({onSuccess: onConnect});

function onConnect() {

}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var jsonString = JSON.parse(message.payloadString);
    var total = jsonString.Die1 + jsonString.Die2;
    gaugeData.setValue(0, 0, jsonString.Die1);
    gaugeData.setValue(0, 1, jsonString.Die2);
    sum += jsonString.Die1 + jsonString.Die2;
    sumGaugeData.setValue(0, 0, jsonString.Die1 + jsonString.Die2);
    sumGaugeData.setValue(0, 1, sum / n);
    gauge.draw(gaugeData, gaugeOptions);
    sumGauge.draw(sumGaugeData, sumGaugeOptions);



    if (total === 2) {
        a += 1;
    } else if (total === 3) {
        b += 1;
    } else if (total === 4) {
        c += 1;
    } else if (total === 5) {
        d += 1;
    } else if (total === 6) {
        e += 1;
    } else if (total === 7) {
        f += 1;
    } else if (total === 8) {
        g += 1;
    } else if (total === 9) {
        h += 1;
    } else if (total === 10) {
        i += 1;
    } else if (total === 11) {
        j += 1;
    } else if (total === 12) {
        k += 1;
    }

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Sum');
    data.addColumn('number', 'Frequency');
    data.addRows([
        [2, a / n], [3, b / n], [4, c / n], [5, d / n], [6, e / n], [7, f / n],
        [8, g / n], [9, h / n], [10, i / n], [11, j / n], [12, k / n]
    ]);

    var options = {
        hAxis: {
            title: 'Sum'

        },
        vAxis: {
            title: 'Frequency',
            minValue: 0,
            maxValue: 1
        },
        backgroundColor: '#f1f8e9',
        width: 900,
        height: 500
    };
    chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    n += 1;
}






