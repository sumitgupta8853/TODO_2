const express = require('express')
const routes = express.Router()

const {register,login,update,deleteUser} = require('../controllers/user')



routes.post('/register',register)
routes.post('/login',login)

routes.put('/user:id',update)
routes.delete('/users/:id', deleteUser) 

module.exports = routes

