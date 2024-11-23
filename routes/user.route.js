const { Router } = require("express");
const router = Router();

const userMiddleware = require("../middleware/user.middleware");
const { User } = require("../db");

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const profilePicture = req.body.profilePicture;
    const bio = req.body.bio;

    try {
        await User.create({
            username,
            password,
            email,
            profilePicture,
            bio,
        })
        res.json({
            msg: "User created successfully"
        })
    } catch(err) {
        res.json({
            msg: "Username or email already exists"
        })
    }

    
})

router.get("/profile", userMiddleware, async (req, res) => {
    const username = req.headers.username
    const user = await User.findOne({
        username
    })

    if(!user){
        res.status(403).json({
            msg: "User not found"
        })
    }

    res.json({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio
    })

})

router.put("/profile",userMiddleware, async (req, res) => {
    const bio = req.body.bio;
    const profilePicture = req.body.profilePicture;
    await User.findOneAndUpdate({
        profilePicture,
        bio
    })
    res.json({
        msg: "Updated successfully",
        bio,
        profilePicture
    })
})

router.post("/profile/follow/:userId", userMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const username = req.headers.username

    const user = await User.findOne({
        username
    })

    await User.updateOne({
        username
    },{
        "$push": {
            following: userId
        }
    })

    await User.findByIdAndUpdate(userId,{
        "$push": {
            followers: user._id
        }
    })
    res.json({
        msg: "You start following" ,userId
    })
})

router.post("/profile/unfollow/:userId",userMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const username = req.headers.username;

    const user = await User.findOne({
        username
    })
    await User.updateOne({
        username
    }, {
        "$pop": {
            following: userId
        }
    })

    await User.findByIdAndUpdate(username, {
        "$pop": {
            followers: userId
        }
    })
    res.json({
        msg: "Unflowed ", userId
    })
})

module.exports = router;