const express = require("express");
const { register, login, logout, getAllUser, updateUserPassword, getSingleUserByAdmin, updateUserRoleByAdmin, deleteUserByAdmin } = require("../Controllers/UserController")
const { adminHeader, authorizeRoles, isAuthenticatedUser, restrict } = require('../middleware/auth')


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);


// USER SETTINGS & PROFILE
router.route("/admin/update-password").put(adminHeader, updateUserPassword);

router.route("/admin/all-users").get(adminHeader, getAllUser);


router
    .route("/admin/user/:id")
    .get(adminHeader, getSingleUserByAdmin);

router
    .route("/admin/delete-user/:id")
    .delete(adminHeader, deleteUserByAdmin);

router
    .route("/admin/update-user/:id")
    .put(adminHeader, updateUserRoleByAdmin);


module.exports = router;