/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function updateTime(response) {

    var lastTime = response.time;
    var time = document.getElementById(response.id.toString());
    var interval = new Date().getTime() - lastTime;
    console.log(interval);
    if (interval < 20000) {
        time.innerHTML = "" + interval / 1000 + "seconds ago";
    }
    else {
        time.innerHTML = "" + interval / 1000 + "seconds ago. \n" + "Suspected Failure";
    }


}

function clickButton(id) {
    var req = newXMLHttpRequest();
    req.onreadystatechange = getReadyStateHandler(req, updateTime);
    req.open("POST", "/PhotonTracker/PhotonServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("id=" + id);
}

