const User = require("../Models/user");
const {setUser, getUser} = require("../Service/auth")


async function HandleSignUp(req,res){
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function HandleLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email:email,password:password});
    if(!user) return res.redirect("/signup");
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports = {
    HandleSignUp,
    HandleLogin
}