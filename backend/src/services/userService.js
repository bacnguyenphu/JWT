const db = require('../models/index')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)

const hashPassword = async (password) => {
    let hash = await bcrypt.hashSync(password, salt);
    return hash
}

const checkEmail = async (emailUser) => {
    if (emailUser) {
        let user = await db.User.findOne({ where: { email: emailUser }, raw: true });

        if (user) {
            return true
        }
        else return false
    }
}

const createUser = async(data)=>{
    try {

        if (await checkEmail(data.email)) {
            return {
                errCode: 1,
                message: "Email is used",
            }
        }
        
        const password = await hashPassword(data.password)
        await db.User.create({ 
            email: data.email, 
            password: password ,
            username:data.username
        })
        return{
            errCode: 0,
            message: "Create a new user success",
        }

        
    } catch (error) {
        console.log('Error server');
        return{
            errCode:-1,
            message:"Error server"
        }
    }
}

module.exports = {createUser}