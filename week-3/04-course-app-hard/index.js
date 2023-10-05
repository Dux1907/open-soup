const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const AdminRoute = require('./Routes/Admin')
const UserRoute = require('./Routes/User')
app.use(cors())
app.use(express.json());
require('dotenv').config()
const connectionString = process.env.DBNAME
app.use('/admin', AdminRoute)
app.use('/users',UserRoute)

mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true,dbname:'Courses'})

app.all("*", (req, res) => {
  res.status(404).send("Page Not found!");
});

app.listen(3001, () => {
  console.log("port has started running.");
});
