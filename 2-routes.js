// Import the Express libarary which adds web server functionality
var express = require("express");



// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();



// Setup a "route" to handle all GET requests for "/" from the client
// Information about the request from the client is stored in the "req" object
// To send a response to the client, use the "res" object
app.get("/", function(req, res){



    // Send a response to the client that says "Hello world!"
   res.send("<h1>Hello world!</h1>");
});



// Setup a "route" to handle all GET requests for "/goodbye" from the client
app.get("/goodbye", function(req, res){



    // Send a response to the client that says "Goodbye cruel world!"
    res.send("<p>Goodbye cruel world.</p>")
});



// Setup a "route" to handle all POST requests for "/submit" from the client
app.post("/submit", function(req, res){



    // Send the entire request object back to the client
    res.send("<p>You posted something!</p>You")
});



// Start the web server on TCP port 3000
app.listen(3000);



// To test this, browse to:
// http://127.0.0.1:3000/
// http://127.0.0.1:3000/goodbye
//
// If you try this in your browser:
// http://127.0.0.1:3000/submit
// You WILL receive an error.
// This is because your browser performs GET requests by default.
// A POST request is only performed when a browser submits data (such as form data).
// If you want to test POSTing without setting up a form, try downloading the tool: Postman