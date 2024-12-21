const { User, Post, Comment } = require("../db");

const createComment = async (req, res) => {
    const { username } = req.headers;
    const { postId } = req.params;
    const { text } = req.body;

    try {
        const user = await User.findOne({ username });
        const post = await Post.findById(postId);

        if (!user || !post) {
            return res.status(404).json({ message: "User or post not found" });
        }

        const comment = await Comment.create({
            userId: user._id,
            postId: postId,
            text,
        })

        await Post.findByIdAndUpdate(postId, {
            $addToSet: {
                comments: comment._id,
            }
        })

        return res.status(201).json({ comment });
    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
};
const getComment = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.headers;

    try {
        const post = await Post.findById(postId);
        const user = await User.findOne({ username });

        if (!post || !user) {
            return res.status(404).json({ message: "Post or User not found" });
        }
        const comments = await Comment.find({ postId: postId });

        res.status(200).json({
            comments,
        })
    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
        
    }
};
const updateComment = async (req, res) => {
    const { username } = req.headers;
    const {commentId} = req.params;
    const {text} = req.body;

    try {
        const comment = await Comment.findById(commentId);
        const user = await User.findOne({username});

        if(!user || !comment){
            return res.status(404).json({message: "User or comment not found"});
        }

        if(comment.userId.toString() !== user._id.toString()){
            return res.status(403).json({message: "You can update only your comment"});
        }

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            text,
        })

        res.status(200).json({
            updatedComment,
            msg: "Comment updated successfully"
        })
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        });
    }
};
const deleteComment = async (req, res) => {
    const { username } = req.headers;
    const {commentId} = req.params;

    try {
        const comment = await Comment.findById(commentId);
        const user = await User.findOne({username});
        const post = await Post.findById(comment.postId);

        if(!user || !comment){
            return res.status(404).json({message: "User or comment not found"});
        }

        if(comment.userId.toString() !== user._id.toString()){
            return res.status(403).json({message: "You can delete only your comment"});
        }

        await Comment.findByIdAndDelete(commentId);
        await Post.findByIdAndUpdate(post._id, {
            $pull: {
                comments: commentId,
            }
        })

        res.status(200).json({
            msg: 'Comment deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        });
    }
};

module.exports = {
    createComment,
    getComment,
    updateComment,
    deleteComment,
};