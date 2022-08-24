// Import the Express libarary which adds web server functionality
var express = require("express");


// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();


// Pass requests for "/" through to a folder called "content".
// This means that requests for file within the "content" folder can be served.
// For example: A request for "/test.jpg" will be served if "test.jpg" exists in the content folder.
app.use("/", express.static('content'))


// We can also pass requests through to a specific file, rather than a whole folder.
// This is much better in terms of security.
app.use("/special", express.static('content/special.jpg'))


// Express can handle requests for static files as dynamic requests.
// In this case we also have a "route" to handle all GET requests for "/hello".
app.get("/hello", function(req, res){
   res.send("<h1>Hello world!</h1>");
});


// Start the web server on TCP port 3000
app.listen(3000);


// To test this, browse to:
// http://127.0.0.1:3000/
// http://127.0.0.1:3000/special
// http://127.0.0.1:3000/hello