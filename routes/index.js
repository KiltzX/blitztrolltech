const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body)
    var userId = req.body.username != undefined || req.body.username != null ? req.body.username : 'garbage'
    const dir = `./uploads/${userId}`
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      cb(null, dir)
    })
    // cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})

var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to Express' });
});

router.post('/upload', upload.single('file'), function (req, res, next) {
  try {
    return res.status(201).json({
      message: 'File uploded successfully'
    });
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
