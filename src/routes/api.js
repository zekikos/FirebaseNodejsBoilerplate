var express = require('express'),
    router = express.Router();

router
  .get('/', function(req, res){
    res.send("Test")
  })
  .use('/upload', require('./upload/uploadImageToLocal'));
 
module.exports = router;