const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
var number = 1;
app.post("/admin/signup", function (req, res) {
  const input = req.body;
  fs.readFile("./solutions/admins.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const admins = JSON.parse(data);
      const final = admins.findIndex((index) => {
        return (
          index.username == input.username && index.password == input.password
        );
      });
      if (final == -1) {
        admins.push(input);
        fs.writeFile(
          "./solutions/admins.json",
          JSON.stringify(admins),
          "utf-8",
          function (err) {
            if (err) throw err;
            else res.status(200).send("Account Created Successfully!");
          }
        );
      } else res.status(403).send("User already exists!");
    }
  });
});
app.post("/admin/login", function (req, res) {
  const input = req.headers;
  fs.readFile("./solutions/admins.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      const admins = JSON.parse(data);
      const final = admins.findIndex((index) => {
        return (
          index.username == input.username && index.password == input.password
        );
      });
      if (final != -1) res.send("Login successful!");
      else res.status(404).send("Wrong username or password");
    }
  });
});
app.post("/admin/courses", function (req, res) {
  var { username, password } = req.headers;
  var body = req.body;
  fs.readFile("./solutions/admins.json", "utf-8", function (err, data) {
    if (err) throw err;
    else {
      var admins = JSON.parse(data);
      const final = admins.findIndex((index) => {
        return index.username == username && index.password == password;
      });
      if (final == -1) res.status(203).send("Wrong username or password!");
      else {
        fs.readFile("./solutions/courses.json", "utf-8", function (err, data) {
          if (err) throw err;
          else {
            const courses = JSON.parse(data);
            if (!body.title || !body.description || !body.price)
              res.send('Either of the title,description or price is missing!')
            else {
              body.id = courses.length + 1;
              courses.push(body);
              fs.writeFile(
                "./solutions/courses.json",
                JSON.stringify(courses),
                function (err) {
                  if (err) throw err;
                  else {
                    res.send("Course created successfully with id:" + body.id);
                  }
                }
              );
            }
          }
        });
      }
    }
  });
});

app.put('/admin/courses/:courseId', function (req, res) {
  var { username, password } = req.headers
  var body = req.body
  fs.readFile('./solutions/admins.json', 'utf-8', function (err, data) {
    if (err) throw data
    else {
      var admins = JSON.parse(data)
      var final = admins.findIndex(index => {
        return index.username == username && index.password == password
      })
      if (final == -1)
        res.status(203).send('Wrong credentials!')
      else {
        fs.readFile('./solutions/courses.json', 'utf-8', function (err, data) {
          if (err) throw err
          else {
            var courses = JSON.parse(data)
            body.id = courses.length + 1
            var id = req.params.courseId
            console.log(id)
            var courseIndex = courses.findIndex(index => index.id == id)
            if (courseIndex != -1) {
              courses = courses.map(index => index.id == id ? { ...index, ...body } : index)
              console.log(courses + 'hi')
              fs.writeFile('./solutions/courses.json', JSON.stringify(courses), 'utf-8', function (err) {
                if (err) throw err
                else
                  res.send('Updated successfully!')
              })
            }
            else
              res.status(404).send('Course with mentioned id not found!')
          }
        })
      }
    }
  })
})

app.get('/admin/courses', function (req, res) {
  const { username, password } = req.headers
  fs.readFile('./solutions/admins.json', 'utf-8', function (err, data) {
    if (err) throw err
    else {
      var admins = JSON.parse(data)
    var final = admins.findIndex(index => index.username == username && index.password == password)
    if (final != -1) {
      fs.readFile('./solutions/courses.json', 'utf-8', function (err, data) {
        if (err) throw err
        else {
          var courses = JSON.parse(data)
          res.send(courses)
        }
      })
    }
    else
      res.status(203).send('Wrong credentials!')
    }
  })
  
})
app.all("*", (req, res) => {
  res.status(404).send("Page Not found!");
});
app.listen(3001, () => {
  console.log("port has started running.");
});
