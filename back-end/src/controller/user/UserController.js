const { hashPassword, comparePassword } = require('../../helper/authenticationHelper');
const User = require('../../model/user')
const JWT = require('jsonwebtoken')
var {expressjwt: jwt} = require('express-jwt')

const requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})
const registerController = async (req, res) => {
    try {
        const {name, email, phone_number, password} = req.body;

        if(!name){
            return res.status(400).send({
                success: false,
                message: "Name is required"
            })
        }
        if(!email){
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if(!phone_number){
            return res.status(400).send({
                success: false,
                message: "Phone-number is required"
            })
        }
        if(!password || password.length < 6){
            return res.status(400).send({
                success: false,
                message: "Password is required and longer than 6 characters"
            })
        }
        const existUser = await User.findOne({phone_number})
        if(existUser){
            return res.status(400).json({message: "Phone_number already register"})
        }


        const hashedPassword = await hashPassword(password)


        const user = await User({name, email, phone_number, password:hashedPassword}).save()
        return  res.status(201).send({
            success: true,
            message: 'Register successfully please login'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Register Api",
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const {phone_number, password} = req.body
        //
        if(!phone_number || !password){
            return res.status(500).send({
                success: false,
                message: "Please enter phone_number or password"
            })
        }
        const user = await User.findOne({phone_number})
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }
        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword){
            return res.status(500).send({
                success: false,
                message: "Wrong password!! Try again"
            })
        }
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        user.password = undefined 
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user,
            token
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login Api",
            error
        })
    }
}


module.exports = {registerController, loginController, requireSignin}