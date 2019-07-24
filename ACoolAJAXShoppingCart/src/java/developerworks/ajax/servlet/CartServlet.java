
package developerworks.ajax.servlet;

import developerworks.ajax.store.Cart;
import javax.servlet.http.*;

import java.util.Enumeration;

public class CartServlet extends HttpServlet {

  // Receive update cart request from client, update the cart and return the xml file to the client 
  public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {

    Enumeration headers = req.getHeaderNames();
    while (headers.hasMoreElements()) {
      String header  =(String) headers.nextElement();
      System.out.println(header+": "+req.getHeader(header));
    }
    // get the information of the cart
    Cart cart = getCartFromSession(req);

    String action = req.getParameter("action");
    String item = req.getParameter("item");
    
    // judge the action that the server should feedback based on the request from the client
    if ((action != null)&&(item != null)) {

      if ("add".equals(action)) {
        cart.addItem(item);

      } else if ("remove".equals(action)) {
        cart.removeItems(item);

      }
    }
    // transform the updated cart to xml version
    String cartXml = cart.toXml();
    res.setContentType("text/xml");
    res.getWriter().write(cartXml);
  }

  public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
    doPost(req,res);
  }
  
  // get the cart information from the http servlet request
  private Cart getCartFromSession(HttpServletRequest req) {

    HttpSession session = req.getSession(true);
    Cart cart = (Cart)session.getAttribute("cart");
    // if the cart is not created then create a new one
    if (cart == null) {
      cart = new Cart();
      session.setAttribute("cart", cart);
    }
    // return the cart object
    return cart;
  }
}
