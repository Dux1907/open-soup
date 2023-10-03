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
    jwt.verify(token, key , function (err, user) {
      if (err) return res.status(403).send()
      if (user.role == 'admin')
        req.IsAdmin = true
      else
        req.IsUser = true
        req.user = user;
        next()
      
    })
  }
  else res.status(401).send()
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
    const token = jwt.sign( payload,  key, { expiresIn: "1h" });
    res.status(200).send({token});
  } else res.status(404).send();
});

app.post("/admin/courses", authentication, async function (req, res) {
  if (req.IsAdmin) {
    var body = req.body;
    if (!body.title || !body.description || !body.price || !body.imageLink)
      res.status(400).send();
    else {
      var newCourse = new courseModel(body);
      await newCourse.save();
      console.log({ id: newCourse.id })
      res.status(200).send({ id: newCourse.id });
    }
  }
  else res.status(401)
});

app.put("/admin/courses/:courseId", authentication, async function (req, res) {
  if (req.IsAdmin) {
    var course = await courseModel.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
    if (course)
      res.status(200).send({ course })
    else
      res.status(404).send()
  }
  else
    res.status(401)
});

app.get("/admin/courses", authentication, async function (req, res) {
  if (req.IsAdmin) {
    let courses = await courseModel.find({})
    res.send(courses)
  }
  else res.status(401)
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
  // console.log('hi')
  const user = await userModel.findOne({ username, password });
  // console.log('hi2')
  if (user) {
    const payload = { username, role: "user" };
    const token = jwt.sign(payload, key, { expiresIn: "1h" });
    // console.log('hi3')
    res.status(200).send({ token });
  } else res.status(404).send();
});

app.get("/users/courses", authentication, async function (req, res) {
  if (req.IsUser) {
    const courses = await courseModel.find({})
    res.send(courses)
  }
  else res.status(401)
});

app.post("/users/courses/:courseId", authentication, async function (req, res) {
  if (req.IsUser) {
    const course = await courseModel.findById(req.params.courseId)
    console.log(course)
    if (course) {
      const user = await userModel.findOne({ username: req.user.username})
      console.log(user)
      if (user) {
        user.purchasedCourses.push(course)
        await user.save()
        res.status(200)
      }
      else
        res.status(404)
    }
  }
  else
    res.status(401)
});
app.get("/users/purchasedCourses", authentication, async function (req, res) {
  if (req.IsUser) {
    const user = await userModel.findOne({ username: req.user.username }).populate('purchasedCourses')
    if (user)
      res.send({ courses:user.purchasedCourses })
    else
      res.status(404)
  }
  else
    res.status(401)
});

app.all("*", (req, res) => {
  res.status(404).send("Page Not found!");
});

app.listen(3001, () => {
  console.log("port has started running.");
});
