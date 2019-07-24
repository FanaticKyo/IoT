/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.util.Date;
import java.util.Enumeration;
import java.util.HashSet;
import javax.servlet.http.*;

/**
 *
 * @author shengxu
 */
public class PhotonServlet extends HttpServlet {

    public static HashSet<Photon> photonList = new HashSet();

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        System.out.println("Connected: ");
        Enumeration headers = req.getHeaderNames();
        while (headers.hasMoreElements()) {
            String header = (String) headers.nextElement();
            System.out.println(header + ": " + req.getHeader(header));
        }
        String id = req.getParameter("Photon_ID");
        // get the information of the photon
        if (id != null) {
            for (Photon p : photonList) {
                if ((p.getId()).equals(id)) {
                    p.setLastTime(new Date().getTime());

                }

            }
            photonList.add(new Photon(id, new Date().getTime()));
        }
        String reqId = req.getParameter("id");
        if (reqId != null) {
            for (Photon p : photonList) {
                if (reqId.equals(p.getId())) {
                    res.setContentType("application/json");
                    res.getWriter().write("{\"id\":\""+reqId+"\", \"time\":" + p.getLastTime() + "}");
                    System.out.println("{\"id\":\""+reqId+"\", \"time\":" + p.getLastTime() + "}");
                }
            }
        }

    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        doPost(req, res);
    }
}
