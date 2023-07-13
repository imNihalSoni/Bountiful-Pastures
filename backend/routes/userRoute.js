const express=require("express");
const { isAuthenticatedUser,authorizedRoles } = require("../middleware/auth");
const { registerUSer, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getSingleUser, updateUserProfileByAdmin, deleteUserProfile } = require("../controllers/userController");
const router =express.Router();




router.route("/register").post(registerUSer);

router.route("/login").post(loginUser);


router.route("/password/forgot").post(forgotPassword);


router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);

router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);

router.route("/logout").get(logoutUser);

router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUser);

router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizedRoles("admin"),updateUserProfileByAdmin)
.delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUserProfile);

module.exports=router;