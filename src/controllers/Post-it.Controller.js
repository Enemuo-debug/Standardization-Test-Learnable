const PostsServices = require('../services/Post.services')
const JWT = require('jsonwebtoken')
const UserServices = require('../services/User.Services')
const PostServices = require('../services/Post.services')
const CommentServices = require('../services/Comment.Service')

class PostsController {
    async CreatePost(req, res){
        const { title, description } = req.body
        const token = req.cookies.jwt
        if(token){
            JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
                if(err){
                    return res.status(404).json({
                        message: 'The token has been tampered',
                        success: false,
                    }).redirect('#')
                }
                else{
                    const Post = await PostsServices.CreatePosts(title, description, decodedToken.id)
                    return res.status(201).json({
                        message: `Post Successfully Created`,
                        success: true,
                        data: `${Post.PostTitle} was created successfully @ ${Post.createdAt}.`
                    })
                }
            })
        }
        else{
            return res.status(404).json({
                message: 'You are not signed into any account so SignIn first before attempting any of these controllers',
                success: false
            })
        }
    }
    async GetAllUserPosts(req, res){
        const token = req.cookies.jwt
        if(token){
            JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
                if(err){
                    return res.status(404).json({
                        message: 'The token has been tampered',
                        success: false,
                    })
                }
                else{
                    const Posts = await PostsServices.FindByPostID(decodedToken.id)
                    const Post = Posts.reverse()
                    let Output = ''
                    for (let i = 0; i < Post.length; i++){
                        if(Post[i].isActive){
                            Output+=`${(Post[i].PostTitle).toUpperCase()}: ${Post[i].Description} ${Post[i].createdAt}.
                        `
                        }
                        else{
                            Output+=''
                        }
                    }
                    if(Output === ''){
                        return res.status(201).json({
                            message: 'Dear User, You do not have any posts',
                            success: true
                        })
                    }
                    else{
                        return res.status(201).json({
                            message: 'Data fetched Successfully',
                            success: true,
                            data: Output
                        })
                    }
                }
            })
        }
        else{
            return res.status(404).json({
                message: 'Please LOGIN or SIGNIN first to access this function',
                success: false
            })
        }
    }
    async GetAllPosts(req, res){
        const token = req.cookies.jwt
        if(token){
            const AllPost = await PostsServices.FindAllPosts()
            const AllPosts = AllPost.reverse()
            let Output = ``;
            for (let i = 0; i < AllPosts.length; i++){
                if(AllPosts[i].isActive){
                    const Sender = await UserServices.findByID(AllPosts[i].PosterID)
                    Output += `${AllPosts[i].PostTitle}: ${AllPosts[i].Description} created on ${AllPosts[i].createdAt} by ${Sender.UserName}
                    `
                }
                else{
                    Output+=''
                }
            }
            return res.status(201).json({
                message: 'Data fetched Succeessfully',
                success: true,
                data: Output
            })
        }
        else{
            return res.status(404).json({
                message: "You are not logged in and cannot access this feature"
            })
        }
    }
    async UpdatePost(req, res) {
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
            if(!req.body.PostTitle || !req.body.Description){
              return res.status(404).json({
                message: 'Please enter valid credentials',
                success: false
              })
            }
            else{
              const data = {
                PostTitle: req.body.PostTitle,
                Description: req.body.Description,
                PosterID: decodedToken.id,
                isActive: true
              }
              const existingPost = await PostsServices.findByID(req.params.id)
              if(existingPost && existingPost.PosterID === decodedToken.id){
                const Updated = await PostsServices.Update2(req.params.id, data)
                return res.status(200).json({
                    message: 'Update successful',
                    success: true,
                    data: Updated
                })
              }
              else if(existingPost.PosterID !== decodedToken.id){
                return res.status(404).json({
                    message: 'This is not your post',
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
    async FindAllCommentsOfAPost(req, res){
        const token = req.cookies.jwt
        const { id } = req.params
        let data1 = 'There are no comments on this post'
        const StuffToEdit = PostServices.findByID(id)
        if(StuffToEdit){
            if(!token){
                return res.status(404).json({
                    message: 'You are not LoggedIn Please LOGIN Now!!!',
                    success: false
                })
            }
            else{
                const comment = await CommentServices.GetPostsComment(req.params.id)
                const comments = comment.reverse()
                data1 = ''
                for (let i = 0; i < comments.length; i++){
                    if(!comments[i].isActive){
                        res.status(404).json({
                            message: 'This comment has been deleted and cannot be tampered',
                            success: false
                        })
                    }
                    const user = await UserServices.findByID(comments[i].Commenter)
                    data1 = data1 + `${comments[i].Comment} by ${user.UserName}
                    `
                }
                return res.status(201).json({
                    message: 'Comments have been successfully fetched',
                    success: true,
                    data: data1
                })
            }
        }
        else{
            return res.status(400).json({
                message: 'This post no longer exists and hence cannot be edited',
                success: false
            })
        }
    }
    async DeleteAPost(req, res){
        const token = req.cookies.jwt;
        if(!token){
            return res.status(404).json({
                message: 'You cannot delete an account without logging in LOGIN Now',
                success: false
            })
        }else{
            JWT.verify(token, process.env.SECRET, async (err, decodedToken) => {
                if(err){
                    return res.status(404).json({
                        message: 'This token has been tampered',
                        success: false
                    })
                }
                // const user = await PostsServices.FindByPostID(decodedToken.id);
                const post = await PostsServices.findByID(req.params.id)
                if(post && post.isActive && post.PosterID === decodedToken.id){
                    const updatedPost = await PostServices.FindByIdAndUpdate(req.params.id)
                    // const UserPosts = await PostServices.FindByPostID(decodedToken.id)
                    const UserComments = await CommentServices.FindByCommenter(decodedToken.id)
                    if(UserComments){
                    // for(let i = 0; i <= UserPosts.length - 1; i++){
                    //         PostServices.FindByIdAndUpdate(UserPosts[i]._id)
                    //     }
                    for(let i = 0; i <= UserComments.length - 1; i++){
                            CommentServices.FindByIdAndUpdate(UserComments[i]._id)
                        }
                        res.cookie("jwt", "", { maxAge: 1 });
                        return res.status(201).json({
                            message: 'This post has been deleted',
                            success: true
                        })
                    }
                    return res.status(201).json({
                        message: 'Delete was Successful',
                        success: true
                    })
                }
                else if(post.PosterID !== decodedToken.id){
                    return res.status(404).json({
                        message: "This is not your post",
                        success: false,
                    });    
                }
                return res.status(404).json({
                    message: "User is no longer in DB or has been deleted before",
                    success: false,
                });
            })
        }
    }
    async GetPostByID(req, res){
        const token = req.cookies.jwt
        const { postid } = req.params
        if(!token){
            return res.status(404).json({
                message: 'Login to access this feature',
                success: false
            })
        }
        else{
            JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
                if(err){
                    return res.status(404).json({
                        message: 'Token has expired or tampered',
                        success: false
                    })
                }
                else{
                    const existingPost = await PostsServices.findByID(postid)
                    if(existingPost){
                        return res.status(200).json({
                            message: 'Data fetched Successfully',
                            success: true,
                            data: [existingPost, 'by', await UserServices.findByID(existingPost.PosterID)]
                        })
                    }
                    return res.status(404).json({
                        message: 'This Post doesn\'t exist or has been deleted',
                        success: false
                    })
                }
            })
        }
    }
    async GetRandomUsersPost(req, res){
        const token = req.cookies.jwt
        const { userid } = req.params
        if(!token){
            return res.status(404).json({
                message: 'Login to access this feature',
                success: false
            })
        }
        JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
            if(err){
                return res.status(404).json({
                    message: 'Token has expired or tampered',
                    success: false
                })
            }
            const allPosts = await PostsServices.FindByPostID(userid)
            return res.status(200).json({
                messsage: 'Data has been fetched',
                success: false,
                data: allPosts
            })
        })
    }
    async GetRandomUsersPostById(req, res){
        const token = req.cookies.jwt
        const { userid, postid } = req.params
        if(!token){
            return res.status(404).json({
                message: 'Login to access this feature',
                success: false
            })
        }
        JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
            if(err){
                return res.status(404).json({
                    message: 'Token has expired or tampered',
                    success: false
                })
            }
            const singlePost = await PostsServices.findByID(postid)
            if(singlePost){
                return res.status(200).json({
                    messsage: 'Data has been fetched',
                    success: true,
                    data: singlePost
                })
            }
            return res.status(404).json({
                messsage: 'Data has been deleted',
                success: false,
            })
        })
    }
}

module.exports = new PostsController()