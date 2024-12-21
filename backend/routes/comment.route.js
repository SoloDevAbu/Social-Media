const {Router} = require('express');
const userMiddleWare = require('../middleware/user.middleware');
const { createComment, getComment, updateComment, deleteComment } = require('../controller/comment.controller');
const router = Router();

router.post('/create/:postId', userMiddleWare, createComment);
router.get('/get/:postId', userMiddleWare, getComment);
router.put('/update/:commentId', userMiddleWare, updateComment);
router.delete('/delete/:commentId', userMiddleWare, deleteComment);

module.exports = router;