const express = require("express");
const app = express();
const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route");

app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.listen(3000);