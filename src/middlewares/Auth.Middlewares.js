const JWT = require('jsonwebtoken')

function AuthenticationManager(req, res, next) {
    const token = req.cookies.jwt
    if(token){
        JWT.verify(token, process.env.SECRET, async (error, decodedToken)=>{
            if(error){
                return res.status(400).json({
                    message: 'The token has expired or tampered',
                    success: false
                }) 
            }else {
                next()
            }
        })
    }
    else{
        return res.status(400).json({
            message: 'You arent Logged In to an account at the moment: LOGIN NOW!!!',
            success: false
        })
    }
}
module.exports = AuthenticationManager