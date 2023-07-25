const fs = require("fs");
const express = require("express");
const app = express();

function sum(n) {
  var count = 0;
  for (let i = 1; i <= n; i++) count += i;
  return count;
}

fs.readFile("a.txt", "utf-8", function (err, data) {
  if (err) console.log(err);
  else console.log(data);
    
});

app.get("/handleSum", function (req, res) {
  res.send("The sum is " + sum(req.query.counter));
});
app.listen(3000, function () {
  console.log("set up!");
});
