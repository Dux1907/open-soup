const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

app.post('/admin/signup', function (req,res) {
  fs.readFile('./admin.js', 'utf-8', function (err, data) {
    if (err) throw err
    else {
      const users = JSON.parse(data)
      
    }
  })
})
app.all('*', (req,res) => {
  res.status(404).send('Page Not found!')
})
app.listen(3001, () => {
  console.log('port has started running.')
})