const{
    CreatePost,
    GetAllUserPosts,
    GetAllPosts,
    UpdatePost,
    FindAllCommentsOfAPost,
    DeleteAPost,
    GetPostByID,
    GetRandomUsersPost,
    GetRandomUsersPostById
} = require('../controllers/Post-it.Controller')
const { 
    PostValidate,
    PostUpdateValidate
 } = require('../middlewares/ValidationSignUp')
const AuthenticationManager = require('../middlewares/Auth.Middlewares')
const router = require('express').Router()

router.post('/create', PostValidate, AuthenticationManager, CreatePost)
router.get('/getAllUserPosts', AuthenticationManager, GetAllUserPosts)
router.get('/getAllPosts', AuthenticationManager, GetAllPosts)
router.put('/update/:id', PostUpdateValidate, AuthenticationManager, UpdatePost)
router.delete('/delete/:id', AuthenticationManager, DeleteAPost)
router.get('/findAllCommentsOfAPost/:id', AuthenticationManager, FindAllCommentsOfAPost)
router.get('/findById/:postid', AuthenticationManager, GetPostByID)
router.get('/GetRandomUsersPost/:userid', AuthenticationManager, GetRandomUsersPost)
router.get('/GetRandomUsersPostById/:userid/:postid', AuthenticationManager, GetRandomUsersPostById)

module.exports = router