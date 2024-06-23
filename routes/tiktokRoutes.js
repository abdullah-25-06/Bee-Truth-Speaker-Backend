const express = require("express");
const router = express.Router()
const { createtiktokPost, singletiktokPost, gettiktokPosts, deletetiktokPost, deletetiktokPosts } = require("../Controllers/TiktokController")
const { adminHeader } = require('../middleware/auth')

router.route("/add-tiktok-post").post(adminHeader, createtiktokPost)
router.route("/get-tiktok-posts").get(adminHeader, gettiktokPosts)
router.route("/get-tiktok-post/:id").get(singletiktokPost)
router.route("/delete-tiktok-post/:id").delete(adminHeader, deletetiktokPost)
router.route("/delete-all-tiktok-posts").delete(adminHeader, deletetiktokPosts)

module.exports = router;