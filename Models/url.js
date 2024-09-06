const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        requires:true,
        unique:true,
    },
    RedirectedURL:{
        type:String,
        requires:true,
    },
    VisitedHistory:[{
        timestamps:{
            type:Number,
        }
    }],
    CreatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
    }
},{timestamps:true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;