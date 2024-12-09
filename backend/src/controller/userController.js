const {createUser} = require('../services/userService')

const handleCreateUser = async(req,res)=>{
    const data = req.body
    console.log(data);
    
    const message = await createUser(data)
    return res.status(200).json(message)
}

module.exports ={handleCreateUser}