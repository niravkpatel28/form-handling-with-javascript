// create a simple backend api server to connect to a db and store users
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { marked } = require("marked");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userRouter = require("./routes/user.route");

// dotenv.config({ path: path.resolve("..", "config.env") });

const { PORT, DB_URL, MODE } = process.env;

const readMePath = path.join(__dirname, "..", "README.md");
const readMeFile = fs.readFileSync(readMePath, "utf-8");

const app = express();

app.use(express.static("."));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(marked.parse(readMeFile));
});

app.use("/users", userRouter);

// connect to a database and start a server
const startApp = async () => {
  if (MODE === "docker" && !DB_URL)
    throw new Error("Database Connection string incorrect");

  console.log("🔥 🔥 Database connection URL", DB_URL);
  try {
    // If user is setting up docker
    if (MODE === "docker") {
      await mongoose.connect(DB_URL);
      console.log("💠 Connect to Database");
    }

    app.listen(PORT || 4000, () => {
      console.log("✌ Api server running on port ", PORT);
    });
  } catch (err) {
    console.log("Application error", err);
  }
};

startApp();
