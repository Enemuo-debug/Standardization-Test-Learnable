class Validators {
    async SignUpValidate(req, res, next){
        const { name, email, password } = req.body
        const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!name){
            return res.status(404).json({
                message: 'Enter a name',
                success: false
            })
        }
        else if(!email){
            return res.status(404).json({
                message: 'Enter an email',
                success: false
            })
        }
        else if(!password){
            return res.status(404).json({
                message: 'Enter a password',
                success: false
            })
        }
        else if(!EmailRegex.test(email)){
            return res.status(404).json({
                message: 'Please enter a valid email address',
                success: false
            })
        }
        else if(name.length < 5){
            return res.status(404).json({
                message: 'Username should not be less than 5 charachters long',
                success: false
            })
        }
        else if(password.length < 8){
            return res.status(404).json({
                message: 'Password should not be less than 8 charachters long',
                success: false
            })
        }
        else{
            next()
        }
    }
    async UpdateValidate(req, res, next){
        const { UserName, Email, PassWord } = req.body
        const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!UserName){
            return res.status(404).json({
                message: 'Enter a UserName',
                success: false
            })
        }
        else if(!Email){
            return res.status(404).json({
                message: 'Enter an Email',
                success: false
            })
        }
        else if(!PassWord){
            return res.status(404).json({
                message: 'Enter a PassWord',
                success: false
            })
        }
        else if(!EmailRegex.test(Email)){
            return res.status(404).json({
                message: 'Please enter a valid Email address',
                success: false
            })
        }
        else if(UserName.length < 5){
            return res.status(404).json({
                message: 'Username should not be less than 5 charachters long',
                success: false
            })
        }
        else if(PassWord.length < 8){
            return res.status(404).json({
                message: 'PassWord should not be less than 8 charachters long',
                success: false
            })
        }
        else{
            next()
        }
    }
    async PostValidate(req, res, next){
        const { title, description } = req.body
        if(!title){
            return res.status(404).json({
                message: 'Enter a title',
                success: false
            })
        }
        else if(!description){
            return res.status(404).json({
                message: 'Enter a descriptiom',
                success: false
            })
        }
        else{
            next()
        }
    }
    async PostUpdateValidate(req, res, next){
        const { PostTitle, Description } = req.body
        if(!PostTitle){
            return res.status(404).json({
                message: 'Enter a title',
                success: false
            })
        }
        else if(!Description){
            return res.status(404).json({
                message: 'Enter a descriptiom',
                success: false
            })
        }
        else{
            next()
        }
    }
    async CommentValidate(req, res, next){
        const { details } = req.body
        if(!details){
            return res.status(404).json({
                message: 'Enter a comment',
                success: false
            })
        }
        else{
            next()
        }
    }
    async CommentUpdateValidate(req, res, next){
        const { Comment } = req.body
        if(!Comment){
            return res.status(404).json({
                message: 'Enter a comment',
                success: false
            })
        }
        else{
            next()
        }
    }
}

module.exports = new Validators()