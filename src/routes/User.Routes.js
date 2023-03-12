const router = require('express').Router();
const {
    SignUp,
    SignIn,
    UpdateUserInfo,
    DeleteUser,
    Logout
} = require('../controllers/User.Controller');
const AuthenticationManager = require('../middlewares/Auth.Middlewares');
const {
    SignUpValidate,
    UpdateValidate
} = require('../middlewares/ValidationSignUp');

router.post('/signup', SignUpValidate, SignUp);
router.post('/signin', SignUpValidate, SignIn);
router.put('/update-user-info', UpdateValidate, AuthenticationManager, UpdateUserInfo);
router.delete('/delete-user', AuthenticationManager, DeleteUser);
router.get('/logout',AuthenticationManager, Logout)

module.exports = router;