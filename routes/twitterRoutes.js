const express = require("express");
const router = express.Router()
const { createTwitterPost, getTwitterPosts, singleTwitterPost, deleteTwitterPost, deleteTwitterPosts } = require("../Controllers/TwitterController")
const { adminHeader} = require('../middleware/auth')

router.route("/add-twitter-post").post(adminHeader, createTwitterPost)
router.route("/get-twitter-posts").get(getTwitterPosts)
router.route("/get-twitter-post/:id").get(singleTwitterPost)
router.route("/delete-twitter-post/:id").delete(adminHeader, deleteTwitterPost)
router.route("/delete-all-twitter-posts").delete(adminHeader, deleteTwitterPosts)

module.exports = router;