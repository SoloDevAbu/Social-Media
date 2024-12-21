const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user.middleware");
const { getUserPosts, updatePost, getAllPosts, createPost, deletePost } = require("../controller/post.controller");

router.post("/post",userMiddleware, createPost);
router.get("/post",userMiddleware, getAllPosts);
router.get("/post/:userId", userMiddleware, getUserPosts);
router.put('/post/:postId', userMiddleware, updatePost);
router.delete('/post/:postId', userMiddleware, deletePost);

module.exports = router;