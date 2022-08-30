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



// Start the web server on TCP port 3000
app.listen(3000);



// To test this, browse to:
// http://127.0.0.1:3000/