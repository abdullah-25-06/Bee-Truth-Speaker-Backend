const ErrorHander = require("../utils/errorHander")
const mongoose = require('mongoose');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Instagram = require("../models/InstragramModel")


// Add Post
exports.createInstaPost = catchAsyncErrors(async (req, res, next) => {
    const { title, post } = req.body
    if (req.user?.role === "admin") {
        const instagram = new Instagram({
            title, post, isApprovedByAdmin: true
        })
        await instagram.save()
        res.status(200).json({
            success: true,
            message: "Instagram Add Successfully by Admin"
        })
    }
    else {
        const instagram = new Instagram({
            title, post
        })
        await instagram.save()
        res.status(200).json({
            success: true,
            message: "Post is waiting to be approved "
        })
    }

})

// get all post
exports.getInstaPosts = catchAsyncErrors(async (req, res, next) => {
    const approvedFacePost = await Instagram.find({ isApprovedByAdmin: true })
    const pendingFacePost = await Instagram.find({
        isApprovedByAdmin: false
    })
    res.status(201).json({
        success: true,
        approvedFacePost,
        pendingFacePost
    });
})

// get Single post
exports.singleInstaPost = catchAsyncErrors(async (req, res, next) => {
    const instagram = await Instagram.findById(req.params.id)
    if (!instagram) {
        return next(new ErrorHander("Instagram Post not found", 404))
    }
    res.status(201).json({
        success: true,
        instagram
    })

})


// Delete Single Blogs
exports.deleteInstaPost = catchAsyncErrors(async (req, res, next) => {
    const instagram = Instagram.findById(req.params.id)
    if (!instagram) {
        return next(new ErrorHander("Instagram Post not found", 404))
    }
    await Instagram.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "instagram post delete successfully"
    })
})

// Delete all blogs
exports.deleteInstaPosts = catchAsyncErrors(async (req, res, next) => {
    const instagram = Instagram.find()
    if (!instagram) {
        return next(new ErrorHander("Instagram Post not found", 404))
    }
    await instagram.deleteMany()
    res.status(201).json({
        success: true,
        message: "All instagram posts deleted successfully"
    })
})