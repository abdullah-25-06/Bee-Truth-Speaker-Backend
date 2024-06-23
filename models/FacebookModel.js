const mongoose = require('mongoose');


const FacebookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Facebook Post title"]
    },
    post: {
        type: String,
        required: [true, "Enter Facebook Post URL"]
    },
    role:{
        type: String,
        default: "admin"
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


const FacebookModel = mongoose.model("FacebookSchema", FacebookSchema)
module.exports = FacebookModel