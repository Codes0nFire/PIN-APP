var mongoose= require("mongoose");



var postSchema=mongoose.Schema({
title:String,
description:String,
image:String,
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},

comment:[

    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }

]
})

module.exports=mongoose.model("post",postSchema);