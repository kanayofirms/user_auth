const AuthorController =  {
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
               .json({success: true, mssg: `We are progressing ${ id }`, data: userPayload})
               }
        catch(error){
            res.status(404)
                .json({error: error.message})
        }
    }
}



module.exports = AuthorController 