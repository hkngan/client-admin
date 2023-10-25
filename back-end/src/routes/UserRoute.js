const express = require('express')
const { loginController, registerController } = require('../controller/user/UserController')
const router = express.Router()

router.post('/user-login', loginController)
router.post('/user-signup', registerController)

module.exports = router