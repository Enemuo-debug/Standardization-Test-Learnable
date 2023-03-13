const router = require('express').Router();
const {
    SignUp,
    SignIn,
    UpdateUserInfo,
    DeleteUser,
    Logout,
    GetAllUsers,
    GetUserById,
    GetCommentsOfUsersPost,
    GetCommentOfUsersPost
} = require('../controllers/User.Controller');
const AuthenticationManager = require('../middlewares/Auth.Middlewares');
const {
    SignUpValidate,
    UpdateValidate
} = require('../middlewares/ValidationSignUp');
const { GetAllUserPosts, GetRandomUsersPost, GetRandomUsersPostById } = require('../controllers/Post-it.Controller')

router.post('/', SignUpValidate, SignUp);
router.post('/signin', SignUpValidate, SignIn);
router.get('/posts', AuthenticationManager, GetAllUserPosts)
router.put('/', UpdateValidate, AuthenticationManager, UpdateUserInfo);
router.delete('/', AuthenticationManager, DeleteUser);
router.get('/:userid/posts', AuthenticationManager, GetRandomUsersPost)
router.get('/:userid/posts/:postid', AuthenticationManager, GetRandomUsersPostById)
router.get('/', AuthenticationManager, GetAllUsers)
router.get('/:userid', AuthenticationManager, GetUserById)
router.get('/:userid/posts/:postid/comments', AuthenticationManager, GetCommentsOfUsersPost)
router.get('/:userid/posts/:postid/comments/:id', AuthenticationManager, GetCommentOfUsersPost)
router.get('/logout',AuthenticationManager, Logout)

module.exports = router;