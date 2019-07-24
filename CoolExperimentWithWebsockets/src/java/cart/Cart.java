package cart;

import java.math.BigDecimal;
import java.util.*;
import javax.json.JsonObject;

// The shopping cart object
public class Cart {

  private HashMap<Item,Integer> contents;

  // The constructor of the cart
  public Cart() {
    contents = new HashMap<Item,Integer>();
  }

  /**
   * Add the specific item to the cart
   * @param itemCode The code of the item that would be added to the cart
   */
  public void addItem(String itemCode) {

    Catalog catalog = new Catalog();

    if (catalog.containsItem(itemCode)) {
      Item item = catalog.getItem(itemCode);

      int newQuantity = 1;
      if (contents.containsKey(item)) {
        Integer currentQuantity = contents.get(item);
        newQuantity += currentQuantity.intValue();
      }

      contents.put(item, new Integer(newQuantity));
    }
  }

  /**
   * Remove the specific item in the cart
   * @param itemCode The code of the item which would be removed
   */
  public void removeItems(String itemCode) {

    
    Catalog catalog = new Catalog();

    if (catalog.containsItem(itemCode)) {
      Item item = catalog.getItem(itemCode);

      int newQuantity = 0;
      
      if (contents.containsKey(item)) {
        Integer currentQuantity = contents.get(item);
        if (currentQuantity == 1) {
            contents.remove(item);
        }
        else {
            newQuantity = currentQuantity.intValue() - 1;
            contents.put(item, new Integer(newQuantity));
        }
      }

    }
  }

  
  //@return the XML version of the details in the cart 
  public String toXml() {
    StringBuffer xml = new StringBuffer();
    xml.append("<?xml version=\"1.0\"?>\n");
    xml.append("<cart generated=\""+System.currentTimeMillis()+"\" total=\""+getCartTotal()+"\">\n");

    for (Iterator<Item> I = contents.keySet().iterator() ; I.hasNext() ; ) {
      Item item = I.next();
      int itemQuantity = contents.get(item).intValue();

      xml.append("<item code=\""+item.getCode()+"\">\n");
      xml.append("<name>");
      xml.append(item.getName());
      xml.append("</name>\n");
      xml.append("<quantity>");
      xml.append(itemQuantity);
      xml.append("</quantity>\n");
      xml.append("</item>\n");
    }
    
    xml.append("</cart>\n");
    return xml.toString();
  }
  
  //@return the JSON version of the details in the cart
  public String toJSON() {
    StringBuffer json = new StringBuffer();
    json.append("{\"cart\":{\"generated\":"+System.currentTimeMillis()+",\"total\":\""+getCartTotal()+"\",\"item\":[");
    for (Iterator<Item> I = contents.keySet().iterator() ; I.hasNext() ; ) {
      Item item = I.next();
      int itemQuantity = contents.get(item).intValue();
      
      
      json.append("{\"code\":\""+item.getCode()+"\",");
      json.append("\"name\":\""+item.getName()+"\",");
      json.append("\"quantity\":"+itemQuantity+"},");
    }
    if (json.charAt(json.length() - 1) == ',') {
      json.deleteCharAt(json.length() - 1);
    }
    json.append("]}}");
    return json.toString();
  }
  
  // Get the total amount of value of the items in the cart
  private String getCartTotal() {
    int total = 0;

    for (Iterator<Item> I = contents.keySet().iterator() ; I.hasNext() ; ) {
      Item item = I.next();
      int itemQuantity = contents.get(item).intValue();

      total += (item.getPrice() * itemQuantity);
    }

    return "$"+new BigDecimal(total).movePointLeft(2);
  }
}
