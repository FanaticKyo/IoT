/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;

/**
 *
 * @author shengxu
 */
public class Photon {

    private String id;
    private long lastTime;

    public Photon(String id, long lastTime) {
        this.id = id;
        this.lastTime = lastTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getLastTime() {
        return lastTime;
    }

    public void setLastTime(long lastTime) {
        this.lastTime = lastTime;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object x) {
        if (((Photon)x).id.equals(this.id)) {
            return true;
        } else {
            return false;
        }

    }
}
