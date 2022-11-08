const express = require('express')
const AuthorController = require('../controllers/author')
const router = express.Router()

//route to pages

router
.get('/', AuthorController.getAll)
.get('/:id', AuthorController.getById)
.post('/', AuthorController.createUser)
.put('/:id', AuthorController.createUser)
.delete('/:id', AuthorController.createUser)

module.exports = router