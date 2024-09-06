const { HandleSignUp,HandleLogin } = require("../Controllers/user");
const express = require("express");
const Router = express.Router();

Router.post("/signup",HandleSignUp);
Router.post("/login",HandleLogin);

module.exports = Router;