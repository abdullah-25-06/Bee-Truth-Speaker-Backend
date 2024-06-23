const ErrorHander = require("../utils/errorHander")
const mongoose = require('mongoose');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Tiktok = require("../models/TiktokModel")


// Add Post
exports.createtiktokPost = catchAsyncErrors(async (req, res, next) => {
    const { title, post } = req.body
    if (req.user?.role === "admin") {
        const tiktok = new Tiktok({
            title, post, isApprovedByAdmin: true
        })
        await tiktok.save()
        res.status(200).json({
            success: true,
            message: "Tiktok Add Successfully by Admin"
        })
    }
    else {
        const tiktok = new Tiktok({
            title, post,
        })
        await tiktok.save()
        res.status(200).json({
            success: true,
            message: "Post is waiting to be approved"
        })
    }
})

// get all Post
exports.gettiktokPosts = catchAsyncErrors(async (req, res, next) => {
    const approvedFacePost = await Tiktok.find({ isApprovedByAdmin: true })
    const pendingFacePost = await Tiktok.find({
        isApprovedByAdmin: false
    })
    res.status(201).json({
        success: true,
        approvedFacePost,
        pendingFacePost
    });
})

// get Single Post
exports.singletiktokPost = catchAsyncErrors(async (req, res, next) => {
    const tiktok = await Tiktok.findById(req.params.id)
    if (!tiktok) {
        return next(new ErrorHander("Tiktok Post not found", 404))
    }
    res.status(201).json({
        success: true,
        tiktok
    })

})


// Delete Single Post
exports.deletetiktokPost = catchAsyncErrors(async (req, res, next) => {
    const tiktok = Tiktok.findById(req.params.id)
    if (!tiktok) {
        return next(new ErrorHander("Tiktok Post not found", 404))
    }
    await Tiktok.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "Tiktok post delete successfully"
    })
})

// Delete all Post
exports.deletetiktokPosts = catchAsyncErrors(async (req, res, next) => {
    const tiktok = Tiktok.find()
    if (!tiktok) {
        return next(new ErrorHander("Tiktok Post not found", 404))
    }
    await tiktok.deleteMany()
    res.status(201).json({
        success: true,
        message: "All Tiktok posts deleted successfully"
    })
})