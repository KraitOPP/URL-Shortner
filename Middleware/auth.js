const {getUser} = require("../Service/auth")

async function restricttoLoggedInUser(req,res,next){
    const useruid = req.cookies?.uid;
    if(!useruid) return res.redirect("/signup");
    
    const user = getUser(useruid);
    
    if(!user) return res.redirect("/signup");
    req.user = user; 
    next();
} 

async function checkAuth(req,res,next){
    const useruid = req.cookies?.uid;
    
    const user = getUser(useruid);

    req.user=user;
    next();
}

module.exports  = {
    restricttoLoggedInUser,
    checkAuth,
};