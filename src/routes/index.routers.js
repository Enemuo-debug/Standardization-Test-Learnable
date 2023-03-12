const userRoutes = require('../routes/User.Routes')
const postRoutes = require('../routes/Post-its.js')
const commentRoutes = require('../routes/comment.routes')
const router = require('express').Router()

router.use('/user', userRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)

module.exports = router