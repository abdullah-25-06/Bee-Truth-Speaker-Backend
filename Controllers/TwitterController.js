const ErrorHander = require("../utils/errorHander")
const mongoose = require('mongoose');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Twitter = require("../models/TwitterModel")


// Add Post
exports.createTwitterPost = catchAsyncErrors(async (req, res, next) => {
    const { title, post } = req.body
    if (req.user?.role === "admin") {
        const twitter = new Twitter({
            title, post, isApprovedByAdmin: true
        })
        await twitter.save()
        res.status(200).json({
            success: true,
            message: "twitter post Add Successfully by admin"
        })
    }
    else {
        const twitter = new Twitter({
            title, post
        })
        await twitter.save()
        res.status(200).json({
            success: true,
            message: "twitter post waiting to be approved"
        })
    }
})

// get all post
exports.getTwitterPosts = catchAsyncErrors(async (req, res, next) => {
    const approvedFacePost = await Twitter.find({ isApprovedByAdmin: true })
    const pendingFacePost = await Twitter.find({
        isApprovedByAdmin: false
    })
    res.status(201).json({
        success: true,
        approvedFacePost,
        pendingFacePost
    });
})

// get Single post
exports.singleTwitterPost = catchAsyncErrors(async (req, res, next) => {
    const twitter = await Twitter.findById(req.params.id)
    if (!twitter) {
        return next(new ErrorHander("twitter Post not found", 404))
    }
    res.status(201).json({
        success: true,
        twitter
    })

})


// Delete Single Blogs
exports.deleteTwitterPost = catchAsyncErrors(async (req, res, next) => {
    const twitter = Twitter.findById(req.params.id)
    if (!twitter) {
        return next(new ErrorHander("twitter Post not found", 404))
    }
    await Twitter.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "twitter post delete successfully"
    })
})

// Delete all blogs
exports.deleteTwitterPosts = catchAsyncErrors(async (req, res, next) => {
    const twitter = Twitter.find()
    if (!twitter) {
        return next(new ErrorHander("twitter Post not found", 404))
    }
    await twitter.deleteMany()
    res.status(201).json({
        success: true,
        message: "All twitter posts deleted successfully"
    })
})