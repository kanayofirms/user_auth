const express = require('express')
const router = express.Router()

//controllers

const Usercontroller = require('../controllers/user')

//route to pages

router
.get('/', Usercontroller.getAll)
.get('/:id',Usercontroller.getById)
.post('/', Usercontroller.createUser)
.put('/', Usercontroller.createUser)
.delete('/:id', Usercontroller.createUser)

module.exports = router