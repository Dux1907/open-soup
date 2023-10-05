const express = require('express')
const { userModel, courseModel, adminModel } = require('../Schema')
const jwt = require('jsonwebtoken')
const  authentication  = require('../Authentication')
require('dotenv').config()
const key = process.env.SECRETKEY

const router = express.Router()
router.post("/signup", async function (req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username, password });
    if (user) res.status(403).send("User Already Exists!");
    else {
      const newUser = new userModel({username,password})
      await newUser.save();
      res.send("User Created Successfully!");
    }
  });
  
  router.post("/login", async function (req, res) {
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
  
  router.get("/courses", authentication, async function (req, res) {
    if (req.IsUser) {
      const courses = await courseModel.find({})
      res.send(courses)
    }
    else res.status(401)
  });
  
  router.post("/courses/:courseId", authentication, async function (req, res) {
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
  router.get("/purchasedCourses", authentication, async function (req, res) {
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

module.exports = router