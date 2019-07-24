/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cart;

import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author shengxu
 */
public class CartDecoder implements Decoder.Text<Cart>{
    private static Cart shoppingCart;
    
    @Override
    public Cart decode(String string) throws DecodeException {
        JsonObject jb = Json.createReader(new StringReader(string)).readObject();
        String action = jb.getString("action");
        String item = jb.getString("item");
        
        if (shoppingCart == null) {
            shoppingCart = new Cart();
        }
        
        if ((action != null)&&(item != null)) {

          if ("add".equals(action)) {
            shoppingCart.addItem(item);

          } else if ("remove".equals(action)) {
            shoppingCart.removeItems(item);

          }
        }    

        return shoppingCart;
    }

    @Override
    public boolean willDecode(String string) {
        try {
            Json.createReader(new StringReader(string)).readObject();
            return true;
        } catch (JsonException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
    
}
