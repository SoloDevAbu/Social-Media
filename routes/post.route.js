const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user.middleware");
const { User, Post } = require("../db");

router.post("/post",userMiddleware, async (req, res) => {
    //Create a new post
    const username = req.headers.username;
    const user = await User.findOne({
        username
    })

    const userId = user._id;
    const content = req.body.content;

    await Post.create({
        userId,
        content
    })
    res.json({
        post: content
    })
})

router.get("/post",userMiddleware, async (req, res) => {
    //Get all the posts
    const contents = await Post.find({});

    res.json({
        contents
    })
})

router.get("/post/:userId", userMiddleware, async (req, res) => {
    //Get the user specific posts
    const username = req.headers.username;
    const user = await User.findOne({
        username
    })
    const userId = user._id;

    const posts = await Post.find({userId})

    res.json({
        posts
    })
})

module.exports = router;