const express = require("express");
const morgan = require("morgan");
const firebase = require("firebase-admin");

require('dotenv').config()

firebase.initializeApp({
  credential: firebase.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
  storageBucket: process.env.STORAGE_BUCKET
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(morgan("dev"));

var routes = require('./src/routes/api');

app.use('/api', routes);

app.use('/static', express.static(process.env.LOCAL_DATA_STORAGE_PATH))

app.get("/ping", (req, res) => {  
  return res.send({
    status: "Healthy",
    uid: req.uid
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});