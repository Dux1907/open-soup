const express = require("express");
const fs = require("fs");
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json());

const secretKey = 'nothing'

const authentication = (req, res, next) => {
  const randomString = req.headers.authorization
  if (randomString) {
    const token = randomString.split(' ')[1]
    jwt.verify(token, secretKey, function (err, user) {
      if (err) return res.status(403).send('Wrong token Credentials!')
        req.user = user; 
        next()
    })
  }
  else res.status(401).send('Token not found!')
}

app.post("/admin/signup", function (req, res) {
  const input = req.body;
  fs.readFile("./solutions/admins.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const admins = JSON.parse(data);
      const final = admins.findIndex((index) => index.username == input.username && index.      password == input.password)
      if (final == -1) {
        admins.push(input);
        // const token = generateToken(input)
        fs.writeFile("./solutions/admins.json",JSON.stringify(admins),"utf-8",function (err) {
            if (err) throw err;
            else res.status(200).send("Account Created Successfully!");
          }
        );
      } else res.status(403).send("Admin already exists!");
    }
  });
});

app.post("/admin/login", function (req, res) {
  const input = req.headers;
  fs.readFile("./solutions/admins.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const admins = JSON.parse(data);
      const final = admins.findIndex(index =>  index.username == input.username && index.password == input.password);
      if (final != -1) {
        const payload = { username: input.username, role: 'admin' }
        const token = jwt.sign({ payload }, secretKey, { expiresIn: '1h' })
        res.send("Login successful as admin with token " + token);
      }
      else res.status(404).send("Wrong username or password");
    }
  });
});

app.post("/admin/courses",authentication, function (req, res) {
  var body = req.body;
        fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
          if (err) throw err;
          else {
            const courses = JSON.parse(data);
            if (!body.title || !body.description || !body.price)
              res.send("Either of the title,description or price is missing!");
            else {
              body.id = courses.length + 1;
              courses.push(body);
              fs.writeFile("./solutions/courses.json",JSON.stringify(courses),function (err) {
                  if (err) throw err;
                  else res.send("Course created successfully with id:" + body.id);
                });
             }
          }
        });
    });

app.put("/admin/courses/:courseId",authentication, function (req, res) {
  var body = req.body;
        fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
          if (err) throw err;
          else {
            var courses = JSON.parse(data);
            body.id = courses.length + 1;
            var id = req.params.courseId;
            // console.log(id);
            var courseIndex = courses.findIndex((index) => index.id == id);
            if (courseIndex != -1) {
              courses = courses.map((index) =>
                index.id == id ? { ...index, ...body } : index
              );
             // console.log(courses + "hi");
              fs.writeFile("./solutions/courses.json",JSON.stringify(courses),"utf-8",function (err) {
                  if (err) throw err;
                  else res.send("Updated successfully!");
                });
            } else res.status(404).send("Course with mentioned id not found!");
          }
        });
});

app.get("/admin/courses",authentication, function (req, res) {
        fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
          if (err) throw err;
          else {
            var courses = JSON.parse(data);
            res.send(courses);
          }
        });
});

app.post("/users/signup", function (req, res) {
  const input = req.body;
  fs.readFile("./solutions/users.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const users = JSON.parse(data);
      const final = users.findIndex(index => index.username == input.username && index.password == input.password);
      if (final == -1) {
        users.push(input);
        fs.writeFile("./solutions/users.json",JSON.stringify(users),"utf-8",function (err) {
            if (err) throw err;
            else res.status(200).send("Account Created Successfully!");
          });
      } else res.status(403).send("User already exists!");
    }
  });
});

app.post("/users/login", function (req, res) {
  const input = req.headers;
  fs.readFile("./solutions/users.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const users = JSON.parse(data);
      const final = users.findIndex(index => index.username == input.username && index.password == input.password);
      if (final != -1) {
        const payload = { username: input.username, role: 'user' }
        const token = jwt.sign({ payload }, secretKey, { expiresIn: '1h' })
        res.send("Login successful as user with token " + token);
      }
      else res.status(404).send("Wrong username or password");
    }
  });
});

app.get("/users/courses",authentication, function (req, res) {
  fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var courses = JSON.parse(data);
      courses = courses.filter((course) => course.published);
      res.send(courses);
    }
  });
});

app.post("/users/courses/:courseId",authentication, function (req, res) {
  var id = req.params.courseId;
  fs.readFile("./solutions/users.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var users = JSON.parse(data);
      var final = users.findIndex(index => index.username == req.user.payload.username);
        fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
          if (err) throw data;
          else {
            const courses = JSON.parse(data);
            var course = courses.filter((course) => course.id == id);
            if (course.length > 0) {
              console.log(course)
              users[final].purchasedCourses.push(course);
              fs.writeFile("./solutions/users.json",JSON.stringify(users),"utf-8",function (err) {
                  if (err) throw err;
                   else res.send("Purchased Successful!");
              });
            }
            else res.send('Id not found!')
          }
        });
    }
  });
});

app.get("/users/purchasedCourses", authentication, function (req, res) {
  fs.readFile("./solutions/users.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var users = JSON.parse(data);
      var final = users.findIndex(index => index.username == req.user.payload.username)
        res.send(users[final].purchasedCourses);
    }
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Page Not found!");
});

app.listen(3001, () => {
  console.log("port has started running.");
});
