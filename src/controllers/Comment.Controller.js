const CommentServices = require('../services/Comment.Service')
const PostsServices = require('../services/Post.services')
// const UserServices = require('../services/User.Services')
const JWT = require('jsonwebtoken')
require('dotenv').config()

class CommentController {
    async CreateComment(req, res){
        const token = req.cookies.jwt
        const { details } = req.body
        const { postid } = req.params
        if(!token){
            return res.status(404).json({
                message: `Please you aren't logged In Please LOGIN now`,
                success: false,
            })
        }
        else{
            const existingPost = await PostsServices.findByID(postid)
            if(existingPost){
                JWT.verify(token, process.env.SECRET, async function (err, decodedToken) {
                    if(err){
                        return res.status(404).json({
                            message: 'The token has been tampered',
                            success: false
                        })
                    }
                    else{
                        const Comment = await CommentServices.createComment(details, req.params.postid, decodedToken.id)
                        return res.status(201).json({
                            message: 'Comment created',
                            success: true,
                            data: Comment
                        })
                    }
                })
            }
            // else if(existingPost.isActive){
            //     JWT.verify(token, process.env.SECRET, async function (err, decodedToken) {
            //         if(err){
            //             return res.status(404).json({
            //                 message: 'The token has been tampered',
            //                 success: false
            //             })
            //         }
            //         else{
            //             const newComment = await CommentServices.createComment(details, postid, decodedToken)
            //             return res.status(201).json({
            //                 message: 'Comment created Successfully',
            //                 success: true,
            //                 data: newComment.details
            //             })
            //         }
            //     })
            // }
            else{
                return res.status(404).json({
                    message: 'Post doesn\'t exist or has been deleted',
                    success: false
                })
            }
        }
    }
    async UpdateComment(req, res){
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //   return res.status(404).json({
        //     message: errors.array()[0].msg,
        //     success: false
        //   })
        //   }
        const token = req.cookies.jwt
    
        if(!token){
          return res.status(404).json({
            message: 'Login to access this',
            success: false
          })
        }
        JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
          if(err){
            return res.status(404).json({
              message: 'Token was tampered or has expired',
              success: false
            })
          }
          if(!req.body.Comment){
            return res.status(404).json({
              message: 'Please enter valid comment',
              success: false
            })
          }
          else{
            const data = {
              Comment: req.body.Comment,
              CommentID: req.params.postid,
              Commenter: decodedToken.id,
              isActive: true
            }
            const existingPost = await PostsServices.findByID(req.params.postid)
            const existingComment = await CommentServices.findById(req.params.commentid)
            if(existingPost && existingComment && existingComment.Commenter){
              const Updated = await CommentServices.Update2(req.params.commentid, data)
              return res.status(200).json({
                  message: 'Update successful',
                  success: true,
                  data: Updated
              })
            }
            else if(existingComment.Commenter !== decodedToken.id){
              return res.status(404).json({
                  message: 'This is not your comment',
                  success: false
              })
            }
            else{
              return res.status(404).json({
                  message: 'Post has already been deleted',
                  success: false
              })
            }
          }
        })
    }
    async DeleteComment(req, res){
      const token = req.cookies.jwt
      if(!token){
        return res.status(404).json({
          message: 'Login to access this feature',
          success: false
        })
      }
      else{
        JWT.verify(token, process.env.SECRET, async (error, decodedToken)=>{
          if(error){
            return res.status(404).json({
              message: 'Token has been tampered',
              success: false
            })
          }
          else{
            const Comment = await CommentServices.findById(req.params.id)
            if(Comment.Commenter === decodedToken.id){
              CommentServices.FindByIdAndUpdate(req.params.id)
              return res.status(200).json({
                message: 'Comment '+Comment.Comment+' has been successfully deleted',
                success: true,
              })
            }
            else{
              return res.status(404).json({
                message: 'This is not your comment and hence you cannot delete it',
                success: false
              })
            }
          }
        })
      }
    }
    async FindCommentOfAPostByID(req, res){
      const token = req.cookies.jwt
      const { postid, commentid } = req.params
      const StuffToEdit = PostsServices.findByID(postid)
      if(StuffToEdit){
          if(!token){
              return res.status(404).json({
                  message: 'You are not LoggedIn Please LOGIN Now!!!',
                  success: false
              })
          }
          else{
              const comment = await CommentServices.findById(commentid)
              if(comment){
                return res.status(200).json({
                  message: 'Comment fetched',
                  success: true,
                  data: comment
                })
              }
              return res.status(400).json({
                message: 'There is no such comment with that id or it has been deleted',
                success: false
              })
          }
      }
      else{
          return res.status(400).json({
              message: 'This post no longer exists and hence its comments cannot be fetched',
              success: false
          })
      }
  }
}

module.exports = new CommentController();