// Import the Express libarary which adds web server functionality
var express = require("express");
// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();



// Import the express-session library which will use cookies to keep track of client sessions
var session = require('express-session');
// Tell the web server (app) to use express-session to track sessions
app.use(session({
    // Set a unique key used internally when tracking sessions
    secret: "Mq0LLJH4Cy17R4pgoPcvDGcVnEqDESrWQViWyQPvQjwHb16fW",
    cookie: {
        // Set a 30 second timeout (30,000 milliseconds)
        maxAge: 1000 * 30
    }
}));



// When we use sessions, we can set and retrieve variables that will only exist within each user's session.
// These variables are stored within:
// req.session
//
// For example, if we were building an online store, each time a user adds something to their shopping cart, we might store that information in a session variable (an array) on the server called shoppingCart.
// When the user goes to checkout and pay, the web server could read that array to see what items the user is purchasing.
//
// Each variable we need can be accessed via req.session
// so for the Shopping Cart example, we would access the shoppingCart variable via:
//
// req.session.shoppingCart



// Setup a "route" to handle all GET requests for "/"
app.get('/', function (req, res) {

    // Check whether the req.session.pageViews variable exists yet
    if (!req.session.pageViews) {
        // req.session.pageViews does not yet exist

        // Set req.session.pageViews to 1 as a starting point
        req.session.pageViews = 1;

        // Build a response to send to the browser
        let myResponse = "Welcome to this page for the first time (this session)!"
        myResponse += "<p>The session variable looks like this:</p><p><pre><code>" + JSON.stringify(req.session, null, "  ") + "</code><pre></p>"

        // Send response back to the browser
        res.send(myResponse);
        

    } else {
        // req.session.pageViews does exist (because the user has accessed this page before and this variable has been set)

        // Add 1 to pageViews
        req.session.pageViews++;

        // Build a response to send to the browser
        let myResponse =`<p>You have visited this page ${req.session.pageViews} times during this session.</p>`
        myResponse += "<a href='/destroy'>Destroy this session</a>"
        myResponse += "<p>The session variable looks like this:</p><p><pre><code>" + JSON.stringify(req.session, null, "  ") + "</code><pre></p>"

        // Send response back to the browser
        res.send(myResponse);

    }
});

// Setup a route that will destroy the user's session
app.get("/destroy", function(req, res) {
    req.session.destroy();
    res.send("Your session has been destroyed. <a href='/'>Go back</a>")
})



// Start the web server on TCP port 3000
app.listen(3000);



// To test this, use an Incognito/private browser and browse to:
// http://127.0.0.1:3000/
// Reload the page a few times.
// Browse to another web site, then go back to http://127.0.0.1:3000/
// in the same Window.
// The open a regular browser windows and browse to it again.
// The session from the other window should have been "forgotten".