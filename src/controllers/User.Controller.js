const UserServices = require("../services/User.Services");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const PostServices = require("../services/Post.services");
const CommentService = require("../services/Comment.Service");
require("dotenv").config();
const maxAge1 = 3 * 24 * 60 * 60 * 1000;
const { validationResult } = require("express-validator");
const generateRandomAvatar = require('../middlewares/DiceBearAPI')

class UserControllers {
  async SignUp(req, res) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(404).json({
    //     message: errors.array()[0].msg,
    //     success: false,
    //   });

      const { name, email, password } = req.body;
      if (!name) {
        return res.json({
          message: "Please enter a name",
          success: false,
        });
      } else if (!email) {
        return res.json({
          message: "Please enter an email",
          success: false,
        });
      } else if (!password) {
        return res.json({
          message: "Please enter a password",
          success: false,
        });
      } else {
        const existingUser = await UserServices.findByName(name);
        if (existingUser && existingUser.isActive) {
            return res.json({
                message: "This Username is on the DB and is still active",
                success: true
              });
        } else {
          const avatarUrl = await generateRandomAvatar(email)
          const User = await UserServices.createUser(name, password, email, avatarUrl);
          return res.json({
            message: "User created successfully",
            success: true,
            user: User,
          });
        }
      }
    
  }
  async SignIn(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        message: "Please enter a name",
        success: false,
      });
    } else if (!email) {
      return res.json({
        message: "Please enter an email",
        success: false,
      });
    } else if (!password) {
      return res.json({
        message: "Please enter a password",
        success: false,
      });
    } else {
      const existingUser = await UserServices.findByName(name);
      if (existingUser) {
        if (existingUser.Email === email) {
          const auth = (password === existingUser.PassWord);
          if (auth) {
            if (!existingUser.isActive) {
              return res.status(404).json({
                message: "User has been deleted",
                success: false,
              });
            } else {
              const token = JWT.sign(
                { id: existingUser._id },
                process.env.SECRET,
                { expiresIn: maxAge1 / 1000 }
              );
              res.cookie("jwt", token, { maxAge: maxAge1, httpOnly: true });
              return res.json({
                message: "User Logged In Successfully",
                success: true,
                data: `${existingUser.UserName} has Signed in to his/her account`,
              });
            }
          } else {
            return res.json({
              message:
                "The Password you entered does not correspond to that which exists as the password to the user you are trying to log in to in the DataBase",
              success: false,
            });
          }
        }
      }
      else{
        return res.json({
            message: "User doesn't exist in DB or has been deleted",
            success: false
        })
      }
    }
  }
  async UpdateUserInfo(req, res) {
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
        if(!req.body.UserName || !req.body.PassWord || !req.body.Email){
          return res.status(404).json({
            message: 'Please enter valid credentials',
            success: false
          })
        }
        else{
          // const salt = bcrypt.genSalt()
          // const data = {
          //   UserName: req.body.UserName,
          //   Email: req.body.Email,
          //   PassWord: await bcrypt.hash(req.body.PassWord, salt)
          // }
          const Updated = await UserServices.Update2(decodedToken.id, req.body)
          return res.status(200).json({
            message: 'Update successful',
            success: true,
            data: Updated
          })
        }
      })
  }
  async DeleteUser(req, res) {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(404).json({
            message: 'There is a problem with the token',
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
            const user = await UserServices.findByID(decodedToken.id);
            if(user && user.isActive){
                await UserServices.FindByIdAndUpdate(user.id)
                const UserPosts = await PostServices.FindByPostID(decodedToken.id)
                const UserComments = await CommentService.FindByCommenter(decodedToken.id)
                if(UserPosts || UserComments){
                  for(let i = 0; i <= UserPosts.length - 1; i++){
                        PostServices.FindByIdAndUpdate(UserPosts[i]._id)
                    }
                  for(let i = 0; i <= UserComments.length - 1; i++){
                        CommentService.FindByIdAndUpdate(UserComments[i]._id)
                    }
                    res.cookie("jwt", "", { maxAge: 1 });
                    return res.status(201).json({
                        message: 'This user has been deleted',
                        success: true
                    })
                }
                else{
                  res.cookie("jwt", "", { maxAge: 1 });
                  return res.status(201).json({
                      message: 'This user has been deleted',
                      success: true
                  })
                }
            }
            return res.status(404).json({
                message: "User is no longer in DB or has been deleted before",
                success: false,
            });
        })
    }
  }
  async Logout(req, res) {
    const token = req.cookies.jwt;
    if (!token) {
      res.clearCookie('jwt');
      return res.status(401).json({
        message: "You are not logged in and cannot access this feature: LogIn Now!!!",
        success: false,
      });
    } else {
      JWT.verify(token, process.env.SECRET, async (error, decodedToken)=>{
        if(error){
          return res.status(401).json({
            message: "Token has been tampered",
            success: false,
          });
        }
        else{
          return res.status(200).json({
            message: "LogOut was successful",
            success: true,
          });
        }
      })
    }
  }

  async GetAllUsers(req, res) {
    const token = req.cookies.jwt
    if(!token){
      return res.status(400).json({
        message: 'Login to access this feature',
        success: false
      })
    }
    const AllUsers = await UserServices.findUsers()
    return res.status(201).json({
        message: "All Users fetched successfully",
        success: true,
        data: AllUsers,
    })
  }
  async GetUserById(req, res) {
    const token = req.cookies.jwt
    if(!token){
      return res.status(400).json({
        message: 'Login to access this feature',
        success: false
      })
    }
    const AllUsers = await UserServices.findByID(req.params.userid)
    if(AllUsers){
      return res.status(201).json({
        message: "All Users fetched successfully",
        success: true,
        data: AllUsers,
      })
    }
    return res.status(201).json({
      message: "User has been deleted or no longer exists in DB",
      success: false,
    })
  }
  async GetCommentsOfUsersPost(req, res){
    const token = req.cookies.jwt
    const { userid, postid } = req.params
    if(!token){
      return res.status(400).json({
        message: 'Login to access this feature',
        success: false
      })
    }
    const user = await UserServices.findByID(userid)
    if(user){
      const post = await PostServices.findByID(postid)
      if(post){
        const comments = await CommentService.GetPostsComment(postid)
        return res.status(200).json({
          message: 'Comments fetch was successful',
          success: true,
          data: comments
        })
      }
      else{
        return res.status(400).json({
          message: 'Post does not exist or has been deleted from data base',
          success: false
        })
      }
    }
    else{
      return res.status(400).json({
        message: 'User doesn\'t exist on DataBase or has been deleted',
        success: false
      })
    }
  }
  async GetCommentOfUsersPost(req, res){
    const token = req.cookies.jwt
    const { userid, postid, id } = req.params
    if(!token){
      return res.status(400).json({
        message: 'Login to access this feature',
        success: false
      })
    }
    const user = await UserServices.findByID(userid)
    if(user){
      const post = await PostServices.findByID(postid)
      if(post){
        const comment = await CommentService.findById(id)
        if(comment){
          return res.status(200).json({
            message: 'Comment fetch was successful',
            success: true,
            data: comment
          })
        }
        else{
          return res.status(400).json({
            message: 'Comment does not exist or has been deleted from data base',
            success: false
          })
        }
      }
      else{
        return res.status(400).json({
          message: 'Post does not exist or has been deleted from data base',
          success: false
        })
      }
    }
    else{
      return res.status(400).json({
        message: 'User doesn\'t exist on DataBase or has been deleted',
        success: false
      })
    }
  }
}

module.exports = new UserControllers();
