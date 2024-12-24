const {getRoles,createRoles,deleteRole,getRolebyIdGroup,assignRoleToGroup} = require('../services/roleService')

const handleGetRoles = async(req,res)=>{
    const message = await getRoles()
    return res.status(200).json(message)
}

const handleCreateRoles = async(req,res)=>{
    const roles = req.body
    const message = await createRoles(roles)
    return res.status(200).json(message)
}

const handleDeleteRole = async(req,res)=>{
    const id = req.query.id
    const message = await deleteRole(+id)
    return res.status(200).json(message)
}

const handleGetRolebyIdGroup = async(req,res)=>{
    const id = req.query.id
    const message = await getRolebyIdGroup(id)
    return res.status(200).json(message)
}

const handleAssignRoleToGroup = async(req,res)=>{
    const data = req.body
    const message = await assignRoleToGroup(data)
    return res.status(200).json(message)
}

module.exports = {handleGetRoles,handleCreateRoles,handleDeleteRole,handleGetRolebyIdGroup, handleAssignRoleToGroup}