const mongoose = require('mongoose')

const setupDB = () =>{
    mongoose.connect('mongodb://localhost:27017/oct-notes-app', { useNewUrlParser: true , useUnifiedTopology: true })
        .then(() => {
            console.log('connected to the DB')
        })
        .catch(err=>{
            console.log(err)
        })
}

module.exports = setupDB