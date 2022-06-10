var express = require('express');
var router = express.Router();
const multer  = require('multer')

var auth = require.main.require('./src/middlewares/auth')

router.use(auth)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.LOCAL_DATA_STORAGE_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
});

var upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024} }).single('image');

router.post('/image',
  function (req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            res.status(500).send("Error occurred! (1)")
            console.log(err)
            return;
        }
        if (!req.file) {
            res.status(500).send("Error occurred! (2)")
            return;
        } else {
            res.send("Uploaded!")
        }
    });
  }
);

module.exports = router;