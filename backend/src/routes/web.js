const express = require('express')
const router = express.Router()
const {handleRegister,handleGetUser,handleLogin,handleDeleteUser,handleGetGroups,handleCreateUser,handleEditUser,handleGetUserById,handleLogout} = require('../controller/userController')
const {handleGetRoles,handleCreateRoles} = require('../controller/roleController')
const {checkUserJWT,checkUserPermission} = require('../middleware/JWTaction')

// router.all('*',checkUserJWT,checkUserPermission,)

router.get('/',(req,res)=>{
    return res.send('hello')
})

router.post('/api/register',handleRegister)
router.post('/api/login',handleLogin)
router.post('/api/logout',handleLogout)

//user
router.get('/api/getUsers',handleGetUser)
router.get('/api/getGroups',handleGetGroups)
router.get('/api/getUserById',handleGetUserById)
router.delete('/api/deleteUser',handleDeleteUser)
router.post('/api/createUser',handleCreateUser)
router.put('/api/editUser',handleEditUser)

//role
router.get('/api/getRoles',handleGetRoles)
router.post('/api/createRoles',handleCreateRoles)

router.get('/api/testApi',(req,res)=>{
    return res.status(200).json({
        message:'okok'
    })
})



module.exports = router
