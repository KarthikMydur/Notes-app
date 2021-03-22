const express = require('express')
const app = express()
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const port = 3030
app.use(express.json())
setupDB()
app.use(cors())
app.use('/', router)

app.listen(port, () => {
    console.log('listening to the port', port)
})
