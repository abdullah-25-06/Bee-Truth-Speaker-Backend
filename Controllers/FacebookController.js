const ErrorHander = require("../utils/errorHander")
const mongoose = require('mongoose');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Facebook = require("../models/FacebookModel")
// const UserPost = require("../models/UserApprovedModel")

// Add Post
exports.createfacePost = catchAsyncErrors(async (req, res, next) => {
    const { title, post } = req.body
    if (req.user?.role === "admin") {
        const facebook = new Facebook({
            title, post, isApprovedByAdmin: true
        })
        await facebook.save()
        res.status(200).json({
            success: true,
            message: "Facebook Post Added by Admin Successfully"
        })
    }
    else {
        const facebook = new Facebook({
            title, post,
        })
        await facebook.save()
        res.status(200).json({
            success: true,
            message: "Post is waiting to be approved",
        })
    }
})

// get all Post
exports.getApprovedfacePosts = catchAsyncErrors(async (req, res, next) => {
    const approvedFacePost = await Facebook.find({ isApprovedByAdmin: true })
    const pendingFacePost = await Facebook.find({
        isApprovedByAdmin: false
    })
    res.status(201).json({
        success: true,
        approvedFacePost,
        pendingFacePost
    });
})
// exports.getPendingfacePosts = catchAsyncErrors(async (req, res, next) => {
//     const pendingFacePost = await Facebook.find({
//         isApprovedByAdmin: false
//     })
//     res.status(201).json({
//         success: true,
//         pendingFacePost,
//     });
// })

// get Single Post
exports.singlefacePost = catchAsyncErrors(async (req, res, next) => {
    const facebook = await Facebook.findById(req.params.id)
    if (!facebook) {
        return next(new ErrorHander("Facebook Post not found", 404))
    }
    res.status(201).json({
        success: true,
        facebook
    })

})


// Delete Single Post
exports.deletefacePost = catchAsyncErrors(async (req, res, next) => {
    const facebook = Facebook.findById(req.params.id)
    if (!facebook) {
        return next(new ErrorHander("Facebook Post not found", 404))
    }
    await Facebook.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "Facebook post delete successfully"
    })
})

// Delete all Post
exports.deletefacePosts = catchAsyncErrors(async (req, res, next) => {
    const facebook = Facebook.find()
    if (!facebook) {
        return next(new ErrorHander("Facebook Post not found", 404))
    }
    await facebook.deleteMany()
    res.status(201).json({
        success: true,
        message: "All Facebook posts deleted successfully"
    })
})