const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user.middleware");
const { unfollowUser, followUser, updateUserProfile, getUserProfile, createUser } = require("../controller/user.controller");

router.post("/signup", createUser);

router.get("/signin", userMiddleware, getUserProfile);

router.put("/profile/update", userMiddleware, updateUserProfile);

router.put("/profile/follow/:userId", userMiddleware, followUser);

router.put("/profile/unfollow/:userId", userMiddleware, unfollowUser)

module.exports = router;