const mongoose = require('mongoose');


const TiktokSchema= new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Tiktok Post title"]
    },
    post: {
        type: String,
        required: [true, "Enter Tiktok Post URL"]
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


const TiktokModel = mongoose.model("TiktokSchema", TiktokSchema)
module.exports = TiktokModel