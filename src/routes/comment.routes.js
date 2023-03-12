const {
    CreateComment,
    UpdateComment
} = require('../controllers/Comment.Controller')
const router = require('express').Router()

router.post('/createComment/:postid', CreateComment)
router.put('/updateComment/:postid/:commentid', UpdateComment)

module.exports = router