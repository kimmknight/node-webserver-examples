// Import the Express libarary which adds web server functionality
var express = require("express");
// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();



// Activate the "express.urlencoded" feature which allows us to read basic form data submitted by clients.
// This will be needed to read the username/password submitted from a login page
app.use(express.urlencoded());



// Import the cookie-parser library which is used to handle cookies
var cookieParser = require("cookie-parser");
// Tell the web server (app) to use cookie-parser
app.use(cookieParser());



// Import the express-session library which will use cookies to keep track of client sessions
var session = require("express-session");
// Tell the web server (app) to use express-session to track sessions
app.use(
    session({
        secret: "eNYNRMTeHhNIzqznJ8U8kzgFhqs6aZMbaCpKrE6hXT2rcW",

        // Set the max session time to 10 minutes. 1000 (ms) * 60 (seconds) * 10 (minutes)
        maxAge: 1000 * 60 * 10,
    })
);



// Setup a temporary username/password object array.
// In a real environment, this would be stored in a database
let users = [
    {
        username: "kim",
        password: "Password1",
    },
    {
        username: "dan",
        password: "Password2",
    },
];



// Create a route to handle requests for "/loginpage" to show the login page (login.html)
app.use("/loginpage", express.static("content/login.html"));



// Create a route for POST requests to "/loginverify" which will verify login details and redirect the user accordingly
app.post("/loginverify", function (req, res) {

    // We will enclose our authentication code in a try...catch block.
    // This way, if any errors occur, we will redirect the user to the login page
    try {

        // Find an object in the "users" array that matches the username submitted.
        // If found then put into userObject. If the user is not found, this will automatically throw an error
        const userObject = users.find(
            (user) => user.username == req.body.username
        );

        // Check whether the password submitted does NOT match the one stored for the user.
        // Throw an error (and move to "catch") if the password doesn't match. Continue if the password does match
        if (userObject.password != req.body.password)
            throw "Error: Incorrect password";

        // If we made it this far then the username and password are valid!
        // Store the username in a session variable
        req.session.username = req.body.username;

        // Redirect the user to a private page
        res.redirect("/overview");

    } catch (error) {

        // If an error occurs while checking the username or password then redirect the user to the login page
        res.redirect("/loginpage");
    }
});



// Create a route for "/private" which links to static files which are only accessible to logged-in users.
app.use("/private", checkLoginDetails, express.static("content-private/"));



// Create a route for "/overview" which displays the overview.html static file
app.use("/overview", checkLoginDetails, express.static("content-private/overview.html"));



// This function "checkLoginDetails" is called by the route above to actually do the username/password validation
function checkLoginDetails(req, res, next) {

    // Check whether the session variable "username" exists
    if (req.session.username) {
        // The "username" session variable exists, therefore the user must be successfully logged in

        // When we use a "check" function like this with Express, we can indicate that the check is successfull by calling the next() function
        next();

    } else {
        
        // The user is not successfully logged in. Redirect them to the login page
        res.redirect("/loginpage");

    }
}



// Create a route for /logout which destroys the current session and redirects to /login
app.get("/logout", function (req, res) {

    // Destroy the session
    req.session.destroy();

    // Redirect the user to the login page
    res.redirect("/loginpage");
});



// Requests for "/" will be redirected to /overview if the user is logged in, or /loginpage if they are not
app.get("/", function (req, res) {
    if (req.session.username) {
        res.redirect("/overview");
    } else {
        res.redirect("/loginpage");
    }
});



// Create a route for "/usersettings" which returns information about the logged-in user (as JSON)
app.get("/usersettings", checkLoginDetails, function (req, res) {
    
    // Respond with an entire copy of the session variable (useful for debugging).
    // We are using "res.json" instead of "res.send" because it is similar, but designed for quickly sending objects as JSON
    res.json(req.session);
});



// Create a route for "/demo" which returns a sample JSON object (as JSON)
app.get("/customers", checkLoginDetails, function (req, res) {
    // Here we create an array full of objects containing sample customer data
    const customerObj = [{customerID:"1",customerName:"Alfreds Futterkiste",contactName:"Maria Anders",address:"Obere Str. 57",city:"Berlin",postalCode:"12209",country:"Germany"},{customerID:"2",customerName:"Ana Trujillo Emparedados y helados",contactName:"Ana Trujillo",address:"Avda. de la Constitución 2222",city:"México D.F.",postalCode:"05021",country:"Mexico"},{customerID:"3",customerName:"Antonio Moreno Taquería",contactName:"Antonio Moreno",address:"Mataderos 2312",city:"México D.F.",postalCode:"05023",country:"Mexico"},{customerID:"4",customerName:"Around the Horn",contactName:"Thomas Hardy",address:"120 Hanover Sq.",city:"London",postalCode:"WA1 1DP",country:"UK"},{customerID:"5",customerName:"Berglunds snabbköp",contactName:"Christina Berglund",address:"Berguvsvägen 8",city:"Luleå",postalCode:"S-958 22",country:"Sweden"}];

    // Respond with the customer array (it will automatically be converted to JSON)
    res.json(customerObj)
})


// Start the web server on TCP port 3000
app.listen(3000);
