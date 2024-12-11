const express = require('express')
const router = express.Router()
const {handleRegister,handleGetUser} = require('../controller/userController')

router.get('/',(req,res)=>{
    return res.send('hello')
})

router.post('/api/register',handleRegister)
router.get('/api/getUser',handleGetUser)
router.get('/api/testApi',(req,res)=>{
    return res.status(200).json({
        message:'okok'
    })
})

module.exports = router
