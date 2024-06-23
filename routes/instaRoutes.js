const express = require("express");
const router = express.Router()
const { createInstaPost, getInstaPosts, singleInstaPost, deleteInstaPost, deleteInstaPosts } = require("../Controllers/InstagramController")
const { adminHeader} = require('../middleware/auth')


router.route("/add-insta-post").post(adminHeader, createInstaPost)
router.route("/get-insta-posts").get(getInstaPosts)
router.route("/get-insta-post/:id").get(singleInstaPost)
router.route("/delete-insta-post/:id").delete(adminHeader, deleteInstaPost)
router.route("/delete-all-insta-posts").delete(adminHeader, deleteInstaPosts)

module.exports = router;