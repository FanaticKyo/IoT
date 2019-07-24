/*
 * Returns an new XMLHttpRequest object, or false if the browser
 * doesn't support it
 */
function newXMLHttpRequest() {

  var xmlreq = false;

  
  if (window.XMLHttpRequest) {
    // Create XMLHttpRequest in browsers that support javascript 
    xmlreq = new XMLHttpRequest();
    // Condition when the browser is Internet Explorer
  } else if (window.ActiveXObject) {

    try {

      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
      
    } catch (e1) {

      // Failed to create required ActiveXObject
      
      try {
        // Create XMLHttpRequest in old Internet Explorer
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");

      } catch (e2) {

        // Do not create the xmlreq because there is no support browser
        xmlreq = false;
      }
    }
  }
// Return the request object
return xmlreq;
}

 /*
	* Returns a function that waits for the specified XMLHttpRequest
	* to complete, then passes it XML response to the given handler function.
  * req - The XMLHttpRequest whose state is changing
  * responseXmlHandler - Function to pass the XML response to
  */
 function getReadyStateHandler(req, responseXmlHandler) {

   // Return an anonymous function that listens to the XMLHttpRequest instance
   return function () {

     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         responseXmlHandler(req.responseXML);

       } else {

         // Show the warning
         alert("HTTP error "+req.status+": "+req.statusText);
       }
     }
   }
 }
