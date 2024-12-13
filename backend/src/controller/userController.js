const {register,login,getUser,getUserWithPagination} = require('../services/userService')

const handleRegister = async(req,res)=>{
    const data = req.body
    const message = await register(data)
    return res.status(200).json(message)
}

const handleLogin = async(req,res)=>{
    const data = req.body
    const message = await login(data)
    return res.status(200).json(message)
}

const handleGetUser = async(req,res)=>{
    const page = req.query.page
    const limit = req.query.limit
    if(req.query.page&&req.query.limit){
        const message = await getUserWithPagination(+page,+limit)
        return res.status(200).json(message)
    }

    const message = await getUser()
    return res.status(200).json(message)
}

module.exports ={handleRegister,handleLogin,handleGetUser}