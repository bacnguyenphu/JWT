const {register,getUser} = require('../services/userService')

const handleRegister = async(req,res)=>{
    const data = req.body
    const message = await register(data)
    return res.status(200).json(message)
}

const handleGetUser = async(req,res)=>{
    const message = await getUser()
    return res.status(200).json(message)
}

module.exports ={handleRegister,handleGetUser}