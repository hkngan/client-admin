const express = require('express')
const { loginController, registerController, paymentController, getOrderController } = require('../controller/user/UserController')
const { isAuth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/user-login', loginController)
router.post('/user-signup', registerController)
router.post('/order', isAuth, paymentController)

router.get('/ticket-list/:id', isAuth, getOrderController)
module.exports = router