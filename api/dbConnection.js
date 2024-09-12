require('dotenv').config(); 
const mongoose = require("mongoose");

const uri = process.env.MONGO_URL; 

function dbConnection() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnection;
