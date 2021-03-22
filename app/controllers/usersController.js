const User = require('../models/user')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthikam50@gmail.com',
        pass: '*********'
    }
})

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body)
        .then(user => {
            return user.generateToken()
        })
        .then(data => {
            res.send( data )
        })
        .catch(err => {
            res.send({err})
        })
}

module.exports.show = (req, res) => {
    User.findOne({ _id : req.user._id })
        .then(user => {
            const { _id , username, email } = user
            res.send({ _id, username, email })
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.delete = (req, res) => {
    const { user, token } = req
    //console.log(user, token)
    User.findOneAndUpdate({ _id : user._id }, { $pull :{ tokens : { token : token }}})
        .then(user => {
            res.send({
                notice : 'successfully logged out'
            })
        })
        .catch(err => {
            res.send(err)
        })
} 


module.exports.reset = (req,res)=>{
    const token = req.header('x-auth')
    const message = {
        from: 'karthikam50@gmail.com',
        to: req.user.email,
        subject: 'Password reset',
        text : `http://localhost:3030/reset-password/${token}`
    }
    transporter.sendMail(message, (err, info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
