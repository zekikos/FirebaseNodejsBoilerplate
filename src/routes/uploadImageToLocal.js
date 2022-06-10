var express = require('express');
var router = express.Router();
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.LOCAL_DATA_STORAGE_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
});

var upload = multer({ storage: storage, limits: {fileSize: 1024 * 100} }).single('image');

router.post('/', //Your authentication check,// 
  function (req, res, next) {

    upload(req, res, function(err) {
        if (err) {
            res.send("Olmadı 1")
            console.log(err)
            return;
        }

        if (!req.file) {
            res.send("Olmadı 2")
            console.log(req)
            return;
        } else {
            //Implement your own logic if needed. Like moving the file, renaming the file, etc.
            res.send("Oldu?")
        }
    });
  }
);

module.exports = router;