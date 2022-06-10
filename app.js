const express = require("express");
const morgan = require("morgan");
const firebase = require("firebase-admin");

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

var auth = require('./src/middlewares/auth')

app.use(express.json()); 
app.use(auth);
app.use(morgan("dev"));
 
app.get("/ping", (req, res) => {  
  return res.send({
    status: "Healthy",
    uid: req.uid
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});