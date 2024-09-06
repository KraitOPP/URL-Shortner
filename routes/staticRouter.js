const URL = require("../Models/url")
const express = require("express");
const router = express.Router();

router.get("/",async(req,res)=>{
    if(!req.user) return res.redirect("/signup");

    const urls = await URL.find({CreatedBy: req.user._id});
    return res.render("home",{
        urls : urls,
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

module.exports = router;