const zod = require("zod");
const { User } = require("../db");

const userSchema = zod.object({
    username: zod.string(2,"Username is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password nust be at least 6 characters"),
    profilePicture: zod.string().optional(),
    bio: zod.string().optional()
})

const createUser = async (req, res) => {
    const validation = userSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
            msg: "Validation failed",
            error: validation.error.errors
        })
    }

    const {username, email, password,profilePicture, bio} = validation.data;

    try {
        const user = await User.create({
            username,
            email,
            password,
            profilePicture,
            bio 
        })

        res.json({
            username: user.username,
            msg: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const getUserProfile = async (req, res) => {
    const username = req.headers.username;

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
            error: error.message
        })
    }
}

const updateUserProfile = async (req, res) => {
    const {email} = req.headers;
    const {username, password, profilePicture, bio} = req.body;

    try {

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        const updatedUser = await User.findOneAndUpdate({
            email
        }, {
            username,
            password,
            profilePicture,
            bio,
        });

        res.json({
            username: updatedUser.username,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            bio: updatedUser.bio
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const followUser = async (req, res) => {
    const {username} = req.headers;
    const {userId} = req.params;

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        await User.findOneAndUpdate({username}, {
            $addToSet: {
                following: userId
            }
        })

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                followers: user._id
            }
        })

        res.status(200).json({
            msg: `You started following ${userId}`
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const unfollowUser = async (req, res) => {
    const {username} = req.headers;
    const {userId} = req.params;

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        await User.findOneAndUpdate({username}, {
            $pull: {
                following: userId
            }
        })

        await User.findByIdAndUpdate(userId, {
            $pull: {
                followers: user._id,
            }
        })

        res.status(200).json({
            msg: `You unfollowed ${userId}` 
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser
}