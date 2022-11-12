const bcrypt = require('bcryptjs')
const User = require('../models/User')

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




/*const Usercontroller =  {
    getAll: async(req, res, next) => {
        try{
            res.status(200)
        .json({success: true, mssg: "Controllers set!!!"})
        }catch(error){
            res.status(404)
               .json({error: error.message})
        }
    },
    getById: async(req, res, next) => {
        const{ id } = req.params
        try{
            res
                .status(200)
                .json({success: true, mssg: `We are progressing, ${id}`})
            }catch(error){
                res.status(404)
                    .json({error: error.message})
            }
    },
    createUser: async(req, res, next) => {
        const{id, fullName} = req.body
        const userPayload = {
            id, 
            fullName
        }
        try{
            res
               .status(200)
               .json(
                {success: true, 
                mssg: `We are progressing ${ id }`, 
                data: userPayload}
                )
               }
        catch(error){
            res.status(404)
                .json({error: error.message})
        }
    }
}
*/



module.exports = {
    Usercontroller
    
 }