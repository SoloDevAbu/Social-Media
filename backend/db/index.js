const mongoose = require("mongoose");
const UserSchema = require("../models/user.model");
const PostSchema = require("../models/post.model");
const CommentSchema = require("../models/comment.model");

mongoose.connect("mongodb+srv://admin:N1QSZgA78glwJnKc@cluster0.gblax.mongodb.net/Social-Media");

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { User, Post, Comment };