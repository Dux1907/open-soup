const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json());
require('dotenv').config()
const connectionString = process.env.DBNAME
const key = process.env.SECRETKEY
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses : [{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published:Boolean
})
const adminSchema =  new mongoose.Schema({
  username: String,
  password:String
})

const userModel = mongoose.model('User', userSchema)
const courseModel = mongoose.model('Course', courseSchema)
const adminModel = mongoose.model('Admin', adminSchema)

const authentication = (req, res, next) => {
  const randomString = req.headers.authorization
  if (randomString) {
    const token = randomString.split(' ')[1]
    jwt.verify(token, { key }, function (err, user) {
      if (err) return res.status(403).send('Wrong token Credentials!')
        req.user = user; 
        next()
    })
  }
  else res.status(401).send('Token not found!')
}

mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true,dbname:'Courses'})

app.post("/admin/signup", async function (req, res) {
  const { username, password } = req.body;
  const admin = await adminModel.findOne({ username, password });
  if (admin) res.status(403).send("Admin already exists!");
  else {
    const newAdmin = new adminModel({ username, password });
    await newAdmin.save();
    res.status(200).send("Account Created Successfully!");
  }
});

app.post("/admin/login", async function (req, res) {
  const { username, password } = req.headers;
  const admin = await adminModel.findOne({ username, password });
  if (admin) {
    const payload = { username, role: "admin" };
    const token = jwt.sign({ payload }, { key }, { expiresIn: "1h" });
    res.send("Login successful as admin with token " + token);
  } else res.status(404).send("Wrong username or password");
});

app.post("/admin/courses", authentication, async function (req, res) {
  var body = req.body;
  if (!body.title || !body.description || !body.price)
    res.send("Either of the title,description or price is missing!");
  else {
    var newCourse = new courseModel(body);
    await newCourse.save();
    res.send("Course created Successfully with id:" + newCourse.id);
  }
});

app.put("/admin/courses/:courseId",authentication,async function (req, res) {
  var course = await courseModel.findByIdAndUpdate(req.params.courseId,req.body,{new:true})
  if (course) 
    res.send('Updated Successfully!')
  else
    res.status(404).send('Course Not Found!')
});

app.get("/admin/courses", authentication, async function (req, res) {
  let courses = await courseModel.find({})
  res.send(courses)
});

app.post("/users/signup", async function (req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (user) res.status(403).send("User Already Exists!");
  else {
    const newUser = new userModel({username,password})
    await newUser.save();
    res.send("User Created Successfully!");
  }
});

app.post("/users/login", async function (req, res) {
  const { username, password } = req.headers;
  const user = await userModel.findOne({ username, password });
  if (user) {
    const payload = { username, role: "user" };
    const token = jwt.sign({ payload }, { key }, { expiresIn: "1h" });
    res.send("Login successful as user with token " + token);
  } else res.status(404).send("Wrong username or password");
});

app.get("/users/courses",authentication, async function (req, res) {
  const courses = await courseModel.find({ published: false })
  res.send(courses)
});

app.post("/users/courses/:courseId",authentication,async function (req, res) {
  const course = await courseModel.findById(req.params.courseId)
  if (course) {
    const user = await userModel.findOne({ username: req.user.payload.username })
    if (user) {
      user.purchasedCourses.push(course)
      await user.save()
      res.send('Course purchased successfully by ' + req.user.payload.username)
    }
    else
      res.status(404).send('User not found!')
  }
  else
    res.status(403).send('Id not Found!')
});
app.get("/users/purchasedCourses", authentication, async function (req, res) {
  const user = await userModel.findOne({ username: req.user.payload.username }).populate('purchasedCourses')
  if(user)
    res.send(user.purchasedCourses)
  else
    res.send('User Not Found!')
});

app.all("*", (req, res) => {
  res.status(404).send("Page Not found!");
});

app.listen(3001, () => {
  console.log("port has started running.");
});
