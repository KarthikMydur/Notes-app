const express = require('express')
const router = express()
const notesController = require('../app/controllers/noteController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middlewares/authentication')
const multer = require('multer')
const reminderAlert = require('../app/middlewares/reminder')

const storage = multer.diskStorage({
    destination :(req, file, cb) => {
        cb(null, './client/public/uploads')
    }
     
})
const upload = multer({ storage })


router.get('/notes',authenticateUser, notesController.list)
router.get('/notes/:id',authenticateUser, notesController.show)
router.post('/notes', authenticateUser,upload.single('photo'), reminderAlert,  notesController.create)
router.put('/notes/:id', authenticateUser,  upload.single('photo'), reminderAlert, notesController.update)
router.delete('/notes/:id', authenticateUser, notesController.destroy)

router.get('/categories', authenticateUser, categoriesController.list)
router.post('/categories',authenticateUser, categoriesController.create)
router.put('/categories/:id',authenticateUser, categoriesController.update)
router.get('/categories/:id',authenticateUser, categoriesController.show)
router.delete('/categories/:id',authenticateUser, categoriesController.destroy)

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.show)
router.delete('/users/logout',authenticateUser, usersController.delete)
router.get('/users/reset-password',authenticateUser, usersController.reset)


module.exports = router

module.exports = router