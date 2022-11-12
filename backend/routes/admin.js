const express = require('express')
const router = express.Router()

const { adminController } = require('../controllers/admin')

//route to pages

/*router
.get('/', AdminController.getAll)
.get('/:id', AdminController.getById)
.post('/', AdminController.createUser)
.put('/:id', AdminController.createUser)
.delete('/:id', AdminController.createUser)*/


//Admins Registration route
router
.post('/register-admin', async(req, res, next) => {
    await adminController(req.body, 'admin', res)
})

//Admins Login route
router
.post('/login-admin', async(req, res, next) => {})

//Get Profile route
router
.get('/profile', async(req, res, next) => {})
//Users Protected route
router
.post('/admin-protected', async(req, res, next) => {})





module.exports = router