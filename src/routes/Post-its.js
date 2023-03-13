const{
    CreatePost,    
    GetAllPosts,
    UpdatePost,
    FindAllCommentsOfAPost,
    DeleteAPost,
    GetPostByID,
    
    GetRandomUsersPostById
} = require('../controllers/Post-it.Controller')
const { 
    PostValidate,
    PostUpdateValidate
 } = require('../middlewares/ValidationSignUp')
 const {
    CommentValidate,
    CommentUpdateValidate
} = require('../middlewares/ValidationSignUp')
const AuthenticationManager = require('../middlewares/Auth.Middlewares')
const router = require('express').Router()
const { CreateComment, FindCommentOfAPostByID, UpdateComment } = require('../controllers/Comment.Controller')

router.post('/', PostValidate, AuthenticationManager, CreatePost)
router.post('/:postid/comments', CommentValidate, AuthenticationManager, CreateComment)
router.get('/', AuthenticationManager, GetAllPosts)
router.put('/:id', PostUpdateValidate, AuthenticationManager, UpdatePost)
router.put('/:postid/comments/:commentid', CommentUpdateValidate, AuthenticationManager, UpdateComment)
router.delete('/:id', AuthenticationManager, DeleteAPost)
router.get('/:id/comments', AuthenticationManager, FindAllCommentsOfAPost)
router.get('/:postid', AuthenticationManager, GetPostByID)
router.get('/:postid/comments/:commentid', AuthenticationManager, FindCommentOfAPostByID)

module.exports = router