/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
   write your logic here, Don't WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
 */

const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.post("/signup", function (req, res) {
  var updatedData = req.body;
  updatedData.id = Math.floor(Math.random() * 1000 + 1);
  fs.readFile("./storeData2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    var locator = obj.filter((t) => t.username == updatedData.username);
    if (locator.length > 0) {
      res.status(400).send();
    } else {
      obj.push(updatedData);
      fs.writeFile(
        "./storeData2.txt",
        JSON.stringify(obj),
        "utf-8",
        function (err) {
          if (err) throw err;
          else res.status(201).send("Signup successful");
        }
      );
    }
  });
});
app.post("/login", function (req, res) {
  var loginData = req.body;
  fs.readFile("./storeData2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var obj = JSON.parse(data);
      for (let i = 0; i < obj.length; i++) {
        if (
          obj[i].username == loginData.username &&
          obj[i].password == loginData.password
        )
          res.status(200).json({
            firstName: obj[i].firstName,
            lastName: obj[i].lastName,
            email: obj[i].email,
          });
      }
    }
    res.status(401);
  });
});
app.get("/data", function (req, res) {
  fs.readFile("./storeData2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      let x = false
      var obj = JSON.parse(data);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].email == req.headers.email && obj[i].password == req.headers.password) {
          let output = [];
          for (var i = 0; i < obj.length; i++) {
            output.push({
              firstName: obj[i].firstName,
              lastName: obj[i].lastName,
              email: obj[i].email,
            });
          }
          res.json({ users: output });
          x = true;
        }
      }
      if(!x)
      res.sendStatus(401);
    }
  });
});
app.all("*", (res) => {
  res.status(404);
});
app.listen(3010, function () {
  console.log("set up!");
});

module.exports = app;
