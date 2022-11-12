const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { SECRET } = require('../config')


//const { getAll } = require('./admin')

//Register user
const Usercontroller = async(userPayload, role, res) => {
    try{
        //User validation
        let usernameNotTaken = await validateUsername(userPayload.username)
        if(!usernameNotTaken) {
                return res
                    .status(400)
                    .json(
                            {
                                success: false, 
                                mssg: 'Username is already taken'
                            })
            }

            //Email validation
        let emailNotRegistered = await validateEmail(userPayload.email)
        if(!emailNotRegistered) {
                return res
                        .status(400)
                        .json(
                                {
                                    success: false,
                                    mssg: 'Email is already registered'
                                }
    )
    } 
    
    //Get the hashed password
    const password = await bcrypt.hash(userPayload.password, 12)
    //Create a user
    const createUser = new User({
        ...userPayload,
        password,
        role
    })
    await createUser.save()
    return res
            .status(201)
            .json({
                mssg: `You've been successfully registered. Please Login.`,
                success: true
    })


    } catch(err) { return res
        .status(500)
        .json({
            mssg: `Unable to create your account. Please try again.`,
            success: false 
    })
    }
 };

 const Logincontroller = async (userCreds, role, res) => {
    let { username, password } = userCreds

    //Check if username is stored in the database

    const user = await User.findOne({ username: username })
    if (!user) {
        return res
                .status(404)
                .json({
                    mssg: "Username is not found. Invalid login credentials.",
                    success: false 
                })

    }
    //Check for the role
    if (user.role != role) {
        return res
                .status(403)
                .json({
                    mssg: "Please make sure you are logging in from the correct portal.",
                    success: false 
                })
    }
    //That means user is existing and trying to signin from the correct portal
    //Now check for the password
    let isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
        //Sign in the token and issue it to the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username : user.username,
            email: user.email
        }, SECRET, { expiresIn: '14 days'})
        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 280
        }
        return res
                .status(200)
                .json({
                    ...result,
                    mssg: "Congratulations! You are now logged in.",
                    success: true 
                })

    } else {
        return res
                .status(403)
                .json({
                    mssg: "Incorrect password",
                    success: false 
                })
    }
 }

const validateUsername = async username => {
    let user = await User.findOne({username: username})
    if (user) {
        return false
    } else {
        return true 
    }
}  

const validateEmail = async email => {
    let user = await User.findOne({email: email})
    if (user) {
        return false 
    } else {
        return true 
    }
}





module.exports = {
    Usercontroller,
    Logincontroller
    
 }