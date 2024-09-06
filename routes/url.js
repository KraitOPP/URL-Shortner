const URL = require("../Models/url")
const express = require("express");
const router = express.Router();
const {HandleShortenURL,HandleURLRedirect,HandleURLAnalytics} = require("../Controllers/url");


router.post("/",HandleShortenURL);
router.get("/:id",HandleURLRedirect)
router.get("/analytics/:id",HandleURLAnalytics)

module.exports = router