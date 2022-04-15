const CommentController = require('../controllers/comment.controller');


module.exports = (app)=>{
    app.post("/api/post", CommentController.createComment);
    app.get("/api/posts/:id", CommentController.getCommentByUser)
    app.put("/api/comment/edit/:id", CommentController.updateComment)
    app.get("/api/comment/:id", CommentController.getOneComment)
    app.delete("/api/comment/:id", CommentController.deleteComment)
}