require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send("Hello");
    });

    app.use("/api", authRoute);

    app.get("/api/test", (req, res) => {
      res.send("Backend Connected");
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
