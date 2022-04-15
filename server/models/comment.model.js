const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment