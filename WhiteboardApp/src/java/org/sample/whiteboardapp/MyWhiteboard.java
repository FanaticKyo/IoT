/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.sample.whiteboardapp;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.Session;

/**
 *
 * @author shengxu
 */
@javax.websocket.server.ServerEndpoint(value="/whiteboardendpoint", encoders = {FigureEncoder.class}, decoders = {FigureDecoder.class})
public class MyWhiteboard {
    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @javax.websocket.OnOpen
    public void onOpen (Session peer) {
        peers.add(peer);
    }
    
    @javax.websocket.OnMessage
    public void onMessage(Figure figure, Session session) throws IOException, EncodeException {
        System.out.println("broadcastFigure: " + figure);
        for (Session peer : peers) {
            peer.getBasicRemote().sendObject(figure);
        }
    }
    
    @javax.websocket.OnClose
    public void onClose (Session peer) {
        peers.remove(peer);
    }
    
}
