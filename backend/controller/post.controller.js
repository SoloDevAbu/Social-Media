const { Post, User } = require("../db");

const createPost = async (req, res) => {
    const {username} = req.headers;
    const {content, imagelink, videoLink} = req.body;

    try {
        const user = await User.findOne({username});

        const post = await Post.create({
            userId: user._id,
            content: content,
            photoLink: imagelink,
            videoLink: videoLink,
        })

        await User.findByIdAndUpdate(user._id, {
            $addToSet: {
                posts: post._id
            }
        })

        res.status(200).json({
            msg: 'Post Created successfully',
            post: content
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllPosts = async (req, res) => {
    //TODO
    //All random post according to user preferences

    try {
        const posts = await Post.find({});

        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getUserPosts = async (req, res) => {
    const {username} = req.headers;

    try {
        const user = await User.findOne({username});

        const posts = await Post.find({userId: user._id});

        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    const {username} = req.headers;
    const {postId} = req.params;
    const {content, imagelink, videoLink} = req.body;

    try {
        const user = await User.findOne({username});
        const post = await Post.findById(postId);

        if(post.userId.toString() !== user._id.toString()) {
            return res.status(401).json({
                msg: 'You are not authorized to update this post'
            })
        }
        await Post.findByIdAndUpdate(postId, {
            content: content,
            photoLink: imagelink,
            videoLink: videoLink,
        });

        res.status(200).json({
            msg: 'Post updated successfully',
            post: post,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    const {username} = req.headers;
    const {postId} = req.params;

    try {
        const user = await User.findOne({username});
        const post = await Post.findById(postId);

        if(post.userId.toString() !== user._id.toString()) {
            return res.status(401).json({
                msg: 'You are not authorized to delete this post'
            })
        }

        await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(user._id, {
            $pull: {
                posts: postId
            }
        })

        res.status(200).json({
            msg: 'Post deleted successfully',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost
}