const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const { getAllUsers, createUser } = require("../controllers/user.controller");
const {
  getAllUsers: getAllUsersArray,
  createUser: createUserArray,
} = require("../controllers/user.array.controller");

dotenv.config({ path: path.resolve("..", "..", "config.env") });

const UserControllerMap = new Map();
UserControllerMap.set("local", {
  getAllUsers: getAllUsersArray,
  createUser: createUserArray,
});

UserControllerMap.set("docker", {
  getAllUsers: getAllUsers,
  createUser: createUser,
});

// console.log("Process.env===contorller", process.env);

const { MODE } = process.env;
// console.log(UserControllerMap.get("local"));

const router = express.Router();
// router.route("/").get(getAllUsers).post(createUser);
router
  .route("/")
  .get(UserControllerMap.get(MODE).getAllUsers)
  .post(UserControllerMap.get(MODE).createUser);

module.exports = router;
