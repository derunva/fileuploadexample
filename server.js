var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  images = [],
  multer  = require('multer'),
  fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/images/')
  },
  filename: function (req, file, cb) {
    var fileNameArr = file.originalname.split('.')
    cb(null, file.fieldname + '-' + Date.now()+'.'+fileNameArr[fileNameArr.length-1])
  }
})
 
var upload = multer({ storage: storage })
app.use('/upload', express.static(__dirname + '/upload'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.route('/images')
  .get((req, res)=>{
    res.send(images)
  })
  .post(upload.single('img'), (req, res)=>{
    console.log(req.file)
    images.push(req.file.path)
    res.send(req.body)
  })


app.listen(8000, ()=>{
  console.log('started on port 8000')
})