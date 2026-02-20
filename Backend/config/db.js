const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
