const { User } = require("../db");

function userMiddleWare(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username,
        password
    })
    .then((value) => {
        if(value){
            next()
        } else {
            res.status(403).json({
                msg: "Unauthorized Access"
            })
        }
    })
}

module.exports = userMiddleWare;