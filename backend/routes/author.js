const express = require('express')
const router = express.Router()

//controller
const { authorController } = require('../controllers/author')

//route to pages

/*router
.get('/', authorController.getAll)
.get('/:id', authorController.getById)
.post('/', authorController.createUser)
.put('/:id', authorController.createUser)
.delete('/:id', authorController.createUser)*/


//Users Registration route
router
.post('/register-author', async(req, res, next) => {
    await authorController(req.body, 'author', res)
})

//Users Login route
router
.post('/login-author', async(req, res, next) => {})

//Get Profile route
router
.get('/profile', async(req, res, next) => {})
//Users Protected route
router
.post('/author-protected', async(req, res, next) => {})




module.exports = router