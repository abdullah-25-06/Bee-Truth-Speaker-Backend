const mongoose = require('mongoose');

const UserApprovedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Post title"]
    },
    post: {
        type: String,
        required: [true, "Enter Post URL"]
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserApprovedModel = mongoose.model("UserApprovedSchema", UserApprovedSchema)
module.exports = UserApprovedModel