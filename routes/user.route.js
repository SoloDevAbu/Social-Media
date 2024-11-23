const { Router } = require("express");
const router = Router();
const zod = require("zod");
const userMiddleware = require("../middleware/user.middleware");
const { User } = require("../db");

const userSchema = zod.object({
    username: zod.string(2,"Username is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password nust be at least 6 characters"),
    profilePicture: zod.string().optional(),
    bio: zod.string().optional()
})

router.post("/signup", async (req, res) => {
    const validation = userSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
            msg: "validation Failde",
            errors: validation.error.errors,
        })
    }

    const {username, email, password, bio} = validation.data;
    try {
        await User.create({
            username,
            email,
            password,
            profilePicture,
            bio
        });
        res.json({
            msg: "User created successfully"
        })
    } catch (error) {
        res.status(400).json({
            msg: "Username or email already exists"
        });
    }
})

router.get("/profile", userMiddleware, async (req, res) => {
    const username = req.headers.username
    
    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({
                msg: "User not found"
            })
        }
        res.json({
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio
        })
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            errorr: error.message
        })
    }
})

router.put("/profile", userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const {bio, profilePicture} = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({
            username
        }, {
            bio,
            profilePicture
        }, {
            new: true
        });
        if(!updatedUser){
            return res.status(404).json({
                msg: "User not found"
            })
        }
        res.json({
            msg: "User updated successfully",
            bio: updatedUser.bio,
            profilePicture: updatedUser.profilePicture
        })
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            error: error.message
        })
    }
})

router.post("/profile/follow/:userId", userMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const username = req.headers.username

    try {
        const user = await User.findOne({
            username
        });
        if(!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        await User.updateOne({
            username
        }, {
            $addToSet: {
                following: userId
            }
        })

        await User.findByIdAndUpdate(userId,{
            $addToSet: {
                followers: user._id
            }
        })
        res.json({
            msg: `You started following ${userId}`
        });
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            error: error.message
        })
    }
})

router.post("/profile/unfollow/:userId", userMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const username = req.headers.username;

    try {
        const user = User.findOne({
            username
        });
        if(!user){
            res.status(404).json({
                nsg: "user not found"
            })
        }
        await User.updateOne({username}, {
            $pull: {
                following: userId
            }
        })

        await User.findByIdAndUpdate(userId, {
            $pull: {
                followers: user._id
            }
        })
        res.json({
            msg: `You Unfollowed ${userId}`
        })
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            error: error.message
        })
    }
})

module.exports = router;