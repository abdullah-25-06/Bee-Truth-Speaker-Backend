/* This code is defining a Mongoose schema for an Instagram post. */
/* `const mongoose = require('mongoose');` is importing the Mongoose library into the code. Mongoose is
an Object Data Modeling (ODM) library for MongoDB and it provides a simple and straightforward way
to interact with MongoDB databases. */

const mongoose = require('mongoose');


const InstagramSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Instagram Post title"]
    },
    post: {
        type: String,
        required: [true, "Enter Instagram Post URL"]
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


const Instagram = mongoose.model("Instagram", InstagramSchema)
module.exports = Instagram