const express = require("express");
const { userModel, courseModel, adminModel } = require('../Schema')
const  authentication  = require('../Authentication')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const key = process.env.SECRETKEY
console.log(key + 'b')
const router = express.Router();
// console.log(key)
router.post("/signup", async function (req, res) {
    const { username, password } = req.body;
    const admin = await adminModel.findOne({ username, password });
    if (admin) res.status(403).send("Admin already exists!");
    else {
      const newAdmin = new adminModel({ username, password });
      await newAdmin.save();
      res.status(200).send("Account Created Successfully!");
    }
  });
  
  router.post("/login", async function (req, res) {
    const { username, password } = req.headers;
    const admin = await adminModel.findOne({ username, password });
    if (admin) {
      const payload = { username, role: "admin" };
      const token = jwt.sign( payload,  key, { expiresIn: "1h" });
      res.status(200).send({token});
    } else res.status(404).send();
  });
  
router.post("/courses", authentication, async function (req, res) {
      console.log(req.IsAdmin)
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
  
  router.put("/courses/:courseId", authentication, async function (req, res) {
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
  
  router.get("/courses", authentication, async function (req, res) {
    if (req.IsAdmin) {
      let courses = await courseModel.find({})
      res.send(courses)
    }
    else res.status(401)
  });

  module.exports = router