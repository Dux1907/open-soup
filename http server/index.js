// const fs = require("fs");
const express = require("express");
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())

function sum(n) {
  var count = 0;
  for (let i = 1; i <= n; i++) count += i;
  return count;
}
function multiply(n) {
  var count = 1;
  for (let i = 1; i <= n; i++) count *= i;
  return count;
}
let request = 0
function middleware(req, res, next) {
  // console.log(req.body)
  next()
  // request += 1
  // console.clear()
  // res.send(`${ request }`)
  // next()
  
//   if (req.headers.counter < 1000) {
//     console.log(req.headers.counter)
//     // res.send(anything) already sent in below function.  send only headers one time otherwise "Cannot set headers after they are sent to the client",this message will occur.
//      next();
//   }
//   else
//     console.log('Enter a value less than equal to 1000.')
 }
app.use(middleware)
// fs.readFile("a.txt", "utf-8", function (err, data) {
//   if (err) console.log(err);
//   else console.log(data);
    
// })

app.post("/handleSum", function (req, res) {

  if (req.body.counter <= 50) {
    var obj = sum(req.body.counter)
    var obj2 = multiply(req.body.counter)
    var ans = {
      sum: obj,
      multiplication:obj2
    }
    res.status(202).json(ans)
  }
  else
    res.status(401).send('Enter a smaller number')
});
app.get('/getSum', function (req, res) {
  res.send(req.query.counter)
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/b.html')
})
app.listen(3000, function () {
  console.log("set up!");
});


