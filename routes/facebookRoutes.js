const express = require("express");
const router = express.Router()
const { createfacePost, getApprovedfacePosts, singlefacePost, deletefacePost, deletefacePosts, getPendingfacePosts } = require("../Controllers/FacebookController")
const { adminHeader} = require('../middleware/auth')


router.route("/add-face-post").post(adminHeader, createfacePost)
router.route("/get-face-posts").get(getApprovedfacePosts)
// router.route("/pending-face-posts").get(getPendingfacePosts)
router.route("/get-face-post/:id").get(singlefacePost)
router.route("/delete-face-post/:id").delete(adminHeader, deletefacePost)
router.route("/delete-all-face-posts").delete(adminHeader, deletefacePosts)

module.exports = router;