const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGO_URL;

const connectDB = () => {
  return mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log(`DB connection successful`))
    .catch((err) => console.log(`Error in DB connection ${err}`));
};

module.exports = connectDB;
