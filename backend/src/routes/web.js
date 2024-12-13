const express = require('express')
const router = express.Router()
const {handleRegister,handleGetUser,handleLogin} = require('../controller/userController')

router.get('/',(req,res)=>{
    return res.send('hello')
})

router.post('/api/register',handleRegister)
router.post('/api/login',handleLogin)

router.get('/api/getUsers',handleGetUser)
router.get('/api/testApi',(req,res)=>{
    return res.status(200).json({
        message:'okok'
    })
})



module.exports = router
