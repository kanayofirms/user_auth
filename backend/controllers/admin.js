const bcrypt = require('bcryptjs')
const User = require('../models/User')

const adminController = async(userPayload, role, res) => {
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
    adminController }