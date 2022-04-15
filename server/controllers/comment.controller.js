const Comment = require('../models/comment.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

module.exports = {

    createComment: (req, res)=>{
        console.log(req.body)

        const {message, author, receiver} = req.body
        const newMessage = new Comment({
            message, 
            author,
            receiver
        })
        
        // const {message} = req.body

        // const newPost = new Comment({
        //     message
        // })

        // console.log("newPost = " + req.body.toString())
        
        // newPost.save()
        // .then((newPost)=>{
        //     console.log(newPost)
        //     res.json(newPost)
        // })
        // .catch((err)=>{
        //     console.log("error with save")
        //     res.status(400).json(err)
        // })

        Comment.create(req.body)
            .then((newComment)=>{
                console.log(newComment)
                res.json(newComment)
            })
            .catch((err)=>{
                console.log("Error in createComment")
                res.status(400).json(err)
            })
    },

    getCommentByUser: (req, res)=>{
        console.log(req.params.id)
        
        Comment.find({receiver:req.params.id})
        .populate("receiver author", "username")
        .then((allComments)=>{
            console.log(allComments)
            res.json(allComments)
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getOneComment: (req, res)=>{
        Comment.findOne({_id:req.params.id})
        .populate("receiver author", "username")
        .then((oneComment)=>{
            console.log(oneComment)
            res.json(oneComment)
        })
        .catch((err)=>{
            console.log("Find one comment failed")
            res.json({message:'Something went wrong in getOneComment', error:err})
        })
    },

    updateComment: (req, res)=>{
        console.log(req.body)
        Comment.findOneAndUpdate({_id:req.params.id}, req.body, {
            new:true,
            runValidators:true
        })
        .then((updatedComment)=>{
            console.log(updatedComment)
            res.json(updatedComment)
        })
        .catch((err)=>{
            console.log("updateComment failed")
            res.status(400).json(err)
        })
    },

    deleteComment: (req, res)=>{
        Comment.deleteOne({_id:req.params.id})
        .then((deletedPet)=>{
            console.log(deletedPet)
            res.json(deletedPet)
        })
        .catch((err)=>{
            console.log("deleteComment failed")
            res.json({message:'Something went wrong deleting comment', error:err})
        })
    }
}