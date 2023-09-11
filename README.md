# README

**[1-hello-world.js](1-hello-world.js)**

This example demonstrates a very basic web server that simply displays "Hello World!".

**[2-routes.js](2-routes.js)**

This example demonstrates adding multiple routes. In this example, there are two routes for the GET method, and one for the POST method.

**[3-static-content.js](3-static-content.js)**

This example demonstrates how to redirect a route through to static content such as HTML pages, images, or a folder of content.

**[4-form-submission.js](4-form-submission.js)**

This example demonstrates how form data can be received using a route. When testing this one, browse to **/form**

**[5-sessions.js](5-sessions.js)**

This example demonstrates session management by utilising the **express-session** package.

**[6-authentication.js](6-authentication.js)**

This example demonstrates adding authentication to a GET route. It utilises **express-session** to keep track of logged-in users.

**[7-authentication-static-content.js](7-authentication-static-content.js)**

This example demonstrates adding authentication to a route serving static content.

**[8-ajax-json.js](8-ajax-json.js)**

This example demonstrates creating a route to serve JSON data on the server, and a page to display that data in the frontend.

**[9-authentication-mongodb.js](9-authentication-mongodb.js)**

This example demonstrates using a database to store usernames/passwords.

**[10-authentication-mongodb-bcrypt.js](10-authentication-mongodb-bcrypt.js)**

This example demonstrates using a database to store usernames and **hashed** passwords using the **bcrypt** package.

**[11-authentication-mongodb-bcrypt-signup.js](11-authentication-mongodb-bcrypt-signup.js)**

This example demonstrates using a database to store usernames and **hashed** passwords, but also has a route and page for user signups.