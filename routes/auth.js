const express = require("express");
const authRouter = express.Router(); // here you can explicitly define the authRouter
const authController = require("../controllers/authController");
const registerController = require("../controllers/registerController");

authRouter.post("/register", registerController.handleNewUser);
authRouter.post("/login", authController.handleLogin);

module.exports = authRouter;
