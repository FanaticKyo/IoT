// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function addToCart(itemCode) {
    console.log("add: " + itemCode);
    var item = "{\"action\": \"add\",\"item\": \"" + itemCode + "\"}";
    sendData(item);
}

/* Removes the specific item from the cart, via Ajax call
 * itemCode
 */
function removeFromCart(itemCode) {
    console.log("remove: " + itemCode);
    var item = "{\"action\": \"remove\",\"item\": \"" + itemCode + "\"}";
    sendData(item);
}

/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in XML document.
 */
function updateCart(cartJSON) {
 var cart = cartJSON.cart;
 var generated = cart.generated;
 if (generated > lastCartUpdate) {
   // Update the time stamp
   lastCartUpdate = generated;
   var contents = document.getElementById("contents");
   contents.innerHTML = "";
   // Get items information in the cart from the xml
   var items = cart.item;
   
   for (var I = 0 ; I < items.length ; I++) {

     var item = items[I];
     var name = item.name;
     var quantity = item.quantity;

     var listItem = document.createElement("li");
     listItem.appendChild(document.createTextNode(name+" x "+quantity));
     contents.appendChild(listItem);
   }
   

 }

 document.getElementById("total").innerHTML = cart.total;
}
