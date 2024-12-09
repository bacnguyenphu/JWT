const express = require('express')
const router = express.Router()
const {handleCreateUser} = require('../controller/userController')

router.get('/',(req,res)=>{
    return res.send('hello')
})

router.post('/api/create-new-user',handleCreateUser)

module.exports = router
