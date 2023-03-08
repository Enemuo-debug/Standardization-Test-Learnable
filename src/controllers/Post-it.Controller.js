const PostsServices = require('../services/Post.services')
const JWT = require('jsonwebtoken')
const UserServices = require('../services/User.Services')

class PostsController {
    async CreatePost(req, res){
        const { title, description } = req.body
        const token = res.cookie.jwt
        if(token){
            JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
                if(err){
                    return res.status(404).json({
                        message: 'The token has been tampered',
                        success: false,
                    }).redirect('#')
                }
                else{
                    const Post = await PostsServices.CreatePosts(title, description, decodedToken)
                    res.status(201).json({
                        message: `Post Successfully Created`,
                        success: true,
                        data: `${Post.PostTitle} was created successfully @ ${Post.createdAt}.`
                    })
                }
            })
        }
        else{
            res.status(404).json({
                message: 'You are not signed into any account so SignIn first before attempting any of these controllers',
                success: false
            })
        }
    }
    async GetAllUserPosts(req, res){
        const token = res.cookie.jwt
        if(token){
            JWT.verify(token, process.env.SECRET, async (err, decodedToken)=>{
                if(err){
                    return res.status(404).json({
                        message: 'The token has been tampered',
                        success: false,
                    }).redirect('#')
                }
                else{
                    const Post = await PostsServices.FindByPostID(decodedToken)
                    const Output = ''
                    for (let i = 0; i < Post.length; i++){
                        Output+=`${(Post[i].PostTitle).toUpperCase()}: ${Post[i].Description} ${Post[i].createdAt}.
                        `
                    }
                    if(Output === ''){
                        return res.status(201).json({
                            message: 'Dear User, You do not have any posts',
                            success: true
                        })
                    }
                    else{
                        res.status(201).json({
                            message: 'Data fetched Successfully',
                            success: true,
                            data: Output
                        })
                    }
                }
            })
        }
        else{
            res.status(404).json({
                message: 'Please LOGIN or SIGNIN first to access this function',
                success: false
            })
        }
    }
    async GetAllPosts(req, res){
        const token = res.cookie.jwt
        if(token){
            const AllPosts = await PostsServices.FindAllPosts()
            const Output = ``;
            for (let i = 0; i < AllPosts.length; i++){
                const Sender = await UserServices.findByID(AllPosts[i].PosterID)
                Output += `${AllPosts[i].PostTitle}: ${AllPosts[i].Description} created on ${AllPosts[i].createdAt} by ${Sender.UserName}
                `
            }
            return res.status(201).json({
                message: 'Data fetched Succeessfully',
                success: true,
                data: Output
            })
        }
        else{
            res.status(404).json({
                message: "You are not logged in and cannot access this feature"
            })
        }
    }
}