// Before trying this example, you should have a MongoDB database called "topgames" with a collection called "users".
// Inside this collection, you will need at least one document containing "username" and "password" properties.
// The username should be plaintext and the password should be hashed.
// A sample is available here called "topgames-users-with-hashed-password.json". Logins to try: kim/Password1  and  dan/Password2



// Import the Express libarary which adds web server functionality
var express = require("express");
// Create an "instance" of Express called "app". We will use "app" to configure and run the web server
var app = express();



// Activate the "express.urlencoded" feature which allows us to read basic form data submitted by clients.
// This will be needed to read the username/password submitted from a login page
app.use(express.urlencoded());



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



// Import the MongoDB client library to a new object called "MongoClient" which we will use to access all MongoDB functions
const {MongoClient} = require("mongodb");

// Define the connection URL of the MongoDB server and additional options.
// In this case we set the "family" option to 4 which forces the connection to use IPv4 which avoids some issues
const client = new MongoClient("mongodb://localhost/", { family: 4 })

// The function that will open the connection to the MongoDB server.
// By using making this an "async" function we can use "await" statements inside of it.
// In simple terms, an "await" statements tell JavaScript to wait until the operation
// is complete before continuing
async function connect() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
    } catch {
        console.log("Error connecting to MongoDB.")
    }
}

// Run the "connect()" function we created above
connect()

// Define a variable that is a reference to a collection we want to access in the database.
// If working with multiple collections, you could create a variable for each one
let usersCollection = client.db("topgames").collection("users");



// Create a route to handle requests for "/loginpage" to show the login page (login.html)
app.use("/loginpage", express.static("content/login.html"));



const bcrypt = require("bcrypt")

// Create a route for POST requests to "/loginverify" which will verify login details and redirect the user accordingly
app.post("/loginverify", function (req, res) {
    // Find a user in the 'usersCollection' with the provided username
    usersCollection.findOne({ username: req.body.username })
    .then((foundUser) => {
        if (!foundUser) {
            // If no user is found with the given username, redirect to the login page
            return res.redirect("/loginpage");
        }

        // Compare the submitted password with the hashed password in the database
        return bcrypt.compare(req.body.password, foundUser.password);
    })
    .then((passwordMatch) => {
        if (passwordMatch) {
            // If the passwords match, set the session username and redirect to '/private'
            req.session.username = req.body.username;
            res.redirect("/private");
        } else {
            // If the passwords do not match, redirect to the login page
            res.redirect("/loginpage");
        }
    })
    .catch((err) => {
        // Handle any errors that occur during the database query
        console.error(err);
        res.redirect("/loginpage"); // Redirect to login page in case of an error
    });
});



// Create a route for "/private" which will contain content only accessible to logged-in users.
// Notice the extra parameter which calls the checkLoginDetails function
app.get("/private", checkLoginDetails, function (req, res) {

    // Respond with a friendly message including the logged-in username.
    // Also includes a link to the logout page
    res.send(`
    <p>Welcome ${req.session.username}!</p>
    <p><a href="/logout">Logout</a></p>
    `);
});



// This function "checkLoginDetails" is called by the "/private" route to check whether the user is logged in yet
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



// Requests for "/" will be redirected to /private if the user is logged in, or /loginpage if they are not
app.get("/", function (req, res) {
    if (req.session.username) {
        res.redirect("/private");
    } else {
        res.redirect("/loginpage");
    }
});



// Start the web server on TCP port 3000
app.listen(3000);
