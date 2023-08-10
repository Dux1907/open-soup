const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())
var number = 1
app.post('/admin/signup', function (req, res) {
  const input = req.body
  fs.readFile('./admin.js', 'utf-8', function (err, data) {
    if (err) throw err
    else {
      const users = JSON.parse(data)
      users.push(input)
      fs.writeFile('./admin.js', JSON.stringify(users), 'utf-8', function (err) {
        if (err) throw err;
        else res.status(200).send('Account Created Successfully!')
      })
    }
  })
})
app.post('/admin/login', function (req, res) {
  const input = req.body
  fs.readFile('./admin.js', 'utf-8', function (err, data) {
    if (err) throw err
    else {
      const users = JSON.parse(data)
      const final = users.findIndex((index) => {
        return index.username == input.username && index.password == input.password
      })
      if (final != -1)
        res.send('Login successful!')
      else
        res.status(404).send('Wrong username or password')
    }
  })
})
app.post('/admin/courses', function (req, res) {
  var header = req.headers
  var body = req.body
  fs.readFile('./admin.js', 'utf-8', function (err, data) {
    if (err) throw err;
    else {
      var users = JSON.parse(data)
      const final = users.findIndex((index) => {
        return index.username == header.username && index.password == header.password
      })
      if (final == -1)
        res.status(404).send('Wrong username or password')
      else {
        fs.readFile('./courses.js', 'utf-8', function (err, data) {
          if (err) throw err
          else {
            var courses = JSON.parse(data);
            body.id = number++
              courses.push(body)
              fs.writeFile('./courses.js', JSON.stringify(courses), 'utf-8', function (err) {
                if (err) throw err
                else {
                  res.send('Course Created successfully with id : ' + body.id)
                }
              })
          }
        })
      }
    }
  })
})
app.all('*', (req,res) => {
  res.status(404).send('Page Not found!')
})
app.listen(3001, () => {
  console.log('port has started running.')
})