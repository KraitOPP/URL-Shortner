const shortid = require("shortid");
const URL = require("../Models/url");

async function HandleShortenURL(req,res){
    const shortenID = shortid.generate();
    const body = req.body;
    if(!body.url) return res.status(400).json({status:"Failed, URL is Required"});
    const result = await URL.create({
        shortID:shortenID,
        RedirectedURL:body.url,
        VisitedHistory:[],
        CreatedBy:req.user._id,
    });
    return res.status(200).render("home",{
        shortenID : shortenID,
    });
}


async function HandleURLRedirect(req,res){
    const shortenID = req.params.id;
    const url = await URL.findOne({shortID: shortenID});
    if(!url) return res.json({status:"Failed, Invalid ID"});
    
    const entry = await URL.updateOne(url,{
        $push:{
            VisitedHistory:{
                timestamps:Date.now(),
            }
        }
    })

    return res.redirect(url.RedirectedURL);
}

async function HandleURLAnalytics(req,res){
    const shortenID= req.params.id;
    const url = await URL.findOne({shortID: shortenID});
    if(!url) return res.json({Status:"Invalid ID"});
    return res.json({TotalVisits: url.VisitedHistory.length,url});
}

module.exports = {
    HandleShortenURL,
    HandleURLRedirect,
    HandleURLAnalytics,
}