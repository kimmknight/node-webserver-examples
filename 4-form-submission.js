// Import the Express libarary which adds web server functionality
var express = require("express");



// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();



// Activate the "express.urlencoded" feature which allows us to read basic form data submitted by clients.
app.use(express.urlencoded());



// We will route "/form" through to the static HTML file "content/form.html"
app.use("/form", express.static('content/form.html'))



// Setup a "route" to handle all POST requests for "/newaccount" from the client
app.post("/newaccount", function(req, res){

   const htmlResponse = `
   <p>Hi ${req.body.firstname} ${req.body.lastname}.</p>
   <p>You have requested a new account.</p>
   <p>We have sent a confirmation email to: ${req.body.emailaddress}</p>
   `
   // Send the entire request object back to the client
   res.send(htmlResponse)
});



// Start the web server on TCP port 3000
app.listen(3000);



// To test this, browse to:
// http://127.0.0.1:3000/form
//
// Fill out the form and submit it.
// The form page will submit data (using POST) to http://127.0.0.1:3000/newaccount
// You should receive a response containing the information you submitted.
// Have a look at the source code for the form page (form.html) to see how it does this.