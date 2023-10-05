const mongoose = require('mongoose')

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
  
module.exports = {
    userModel,courseModel,adminModel
}