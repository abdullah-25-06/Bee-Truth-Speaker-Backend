const mongoose = require('mongoose');


const TwitterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Twitter Post title"]
    },
    post: {
        type: String,
        required: [true, "Enter Twitter Post URL"]
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


const TwitterModel = mongoose.model("TwitterSchema", TwitterSchema)
module.exports = TwitterModel