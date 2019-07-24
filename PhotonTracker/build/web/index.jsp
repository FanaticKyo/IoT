<%@ page import="java.util.*" %>
<%@ page import="servlet.*" %>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script type="text/javascript" language="javascript" src="ajax.js"></script>
        <script type="text/javascript" language="javascript" src="photon.js"></script>
        
    </head>
    <body>
        <div style="float: left; width: 500px">
            <h2>Photon fleet report</h2>
            <table border="1">
                <thead><th>Photon Name</th><th>ID</th><th>Last Heartbeat</th><th>Fetch Update</th></thead>
                <tbody>
                    <%
                        for (Photon photon: PhotonServlet.photonList){
                    %>
                    <tr><td>Photon</td><td><%= photon.getId() %></td><td id = "<%= photon.getId() %>"><%= new Date(photon.getLastTime()).toString() %><td><button onclick="clickButton('<%= photon.getId() %>')">Update Time</button></td></tr>
                    <% } %>
                </tbody>
            </table>
    </body>
</html>
