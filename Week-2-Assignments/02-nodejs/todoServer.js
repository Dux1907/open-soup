/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
let number = 1;
app.get("/", function (req, res) {
  res.send('hi')
});

app.get("/todos", function (req, res) {
  //res.status(200).json(activities);
  fs.readFile("./todoServer2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else res.status(200).json(JSON.parse(data));
  });
});

app.get("/todos/:id", function (req, res) {
  var id = req.params.id;
  fs.readFile("./todoServer2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var todo = JSON.parse(data).find((todos) => todos.id == id);
      if (todo) res.status(200).json(todo);
      else res.status(404).send("Id not found");
    }
  });
  // var todo = activities.find((todos) => todos.id == id);
});
app.post("/todos", function (req, res) {
  var newData = req.body;
  newData.id = number++;
  fs.readFile("./todoServer2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var todo = JSON.parse(data);
      todo.push(newData);
      fs.writeFile("./todoServer2.txt", JSON.stringify(todo), "utf-8", function (err) {
        if (err) throw err;
        else res.status(201).send(newData);
      });
    }
  });
});

app.put("/todos/:id", function (req, res) {
  var id = req.params.id;
  const updatedData = req.body;
  updatedData.id = id;
  fs.readFile("./todoServer2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
     var todo = JSON.parse(data);
      const find = todo.findIndex((t) => t.id == id);
      if (find != -1) {
        todo[find] = updatedData;
        fs.writeFile("./todoServer2.txt", JSON.stringify(todo), "utf-8", function (err) {
          if (err) throw err;
          else res.status(200).json(updatedData);
        });
      } else res.status(404).send("Not found!");
    }
  });
  // var a = activities.findIndex((t) => t.id == id);
  // if (a != -1) {
  //   updatedData.id = id;
  //   res.status(200).json(updatedData);
  //   activities[a] = updatedData;
  // } else res.status(404).send("Not found!");
});

app.delete("/todos/:id", function (req, res) {
  var id = req.params.id;
  fs.readFile("./todoServer2.txt", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const todo = JSON.parse(data);
      const find = todo.findIndex((t) => t.id == id);
      if (find != -1) {
        const final = todo.filter((element,index) => index != find)
       // console.log(JSON.stringify(final) + 'final')
        fs.writeFile("./todoServer2.txt", JSON.stringify(final), "utf-8", function (err) {
          if (err) throw err;
          else
          res.status(200).send("Deleted successfully.");
        });
      } else res.status(404).send("Not found!");
    } 
  });
  // var a = activities.find((t) => t.id == id);
  // activities = activities.filter((t) => t.id != id);
  // if (a) res.status(200).json(a);
  // else res.status(404).send("Not found");
});

app.all("*", (req, res, next) => {
  res.status(404).send("Not Found!");
});

app.listen(3010, function () {
  console.log("set up");
});

module.exports = app;
