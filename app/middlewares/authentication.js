const User = require('../models/user')

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    //console.log('authenticate user', req.body)
    User.findByToken(token)
        .then(user => {
            req.user = user
            req.token = token
            next()
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = authenticateUser