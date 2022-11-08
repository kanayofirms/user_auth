const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')

//route to pages

router
.get('/', AdminController.getAll)
.get('/:id', AdminController.getById)
.post('/', AdminController.createUser)
.put('/:id', AdminController.createUser)
.delete('/:id', AdminController.createUser)


module.exports = router