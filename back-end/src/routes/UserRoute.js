const express = require('express')
const { 
    loginController,
    registerController, 
    paymentController, 
    getOrderController, 
    fineTunedChatController, 
    updateInformationController, 
    getUserController, 
    verifyOTP,
    changePassword,
    sendOTP
 } = require('../controller/user/UserController')
const { isAuth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/user-login', loginController)
router.post('/user-signup', registerController)
router.post('/order', isAuth, paymentController)
router.post('/chat', isAuth, fineTunedChatController)
router.post('/send-otp',isAuth, sendOTP)
router.post('/verify',isAuth, verifyOTP)


router.get('/ticket-list/:id', isAuth, getOrderController)
router.get('/user-info/:id', isAuth, getUserController)

router.put('/update-profile/:id', isAuth, updateInformationController)
router.put('/change-password', isAuth, changePassword)

module.exports = router