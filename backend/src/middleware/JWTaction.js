const jwt = require('jsonwebtoken');

const nonSecurePaths = ['/','/api/login','/api/register','/api/logout']

const createJWT = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, 'nger')
    } catch (error) {
        console.log(error);
    }
    return token
}

const verifyJWT = (token) => {
    let decode = null
    try {
         decode = jwt.verify(token, 'nger');
    } catch (err) {
        console.log(err);
    }

    return decode
}

const checkUserJWT = (req,res,next)=>{    
    if(nonSecurePaths.includes(req.path)) return next()
    let cookies = req.cookies
    
    if(cookies&&cookies.jwt){
        let decode = verifyJWT(cookies.jwt)
        if(decode){
            req.user = decode
            next()
        }else{
            return res.status(401).json({
                errCode:-1,
                message:"Not authenticated the user"
            })
        }
    }else{
        return res.status(401).json({
            errCode:-1,
            message:"Not authenticated the user"
        })
    }
}

const checkUserPermission = (req,res,next)=>{

    if(nonSecurePaths.includes(req.path)) return next()
    if(req.user){
        const roles = req.user.group.roles||[]
        const path = req.path

        if(!roles&&roles.length===0){
            return res.status(403).json({
                errCode:-1,
                message:"You don't permission to accsess"
            })
        }

        let canAccess = roles.some(role=>role.url===path)

        if(canAccess){
            next()
        }else{
            return res.status(403).json({
                errCode:-1,
                message:"You don't permission to accsess"
            })
        }
        
    }else{
        return res.status(401).json({
            errCode:-1,
            message:"Not authenticated the user"
        })
    }
    
}

module.exports = { createJWT,verifyJWT,checkUserJWT,checkUserPermission }