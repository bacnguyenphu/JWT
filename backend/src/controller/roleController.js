const {getRoles,createRoles} = require('../services/roleService')

const handleGetRoles = async(req,res)=>{
    const message = await getRoles()
    return res.status(200).json(message)
}

const handleCreateRoles = async(req,res)=>{
    const roles = req.body
    const message = await createRoles(roles)
    return res.status(200).json(message)
}

module.exports = {handleGetRoles,handleCreateRoles}