const db = require('../models')

const getRoles = async()=>{
    try {
        const roles = await db.Role.findAll({
            raw:true,
            order: [
                ['id', 'DESC'],
            ],
        })
        if(!roles){
            return{
                errCode:1,
                message:'Get roles failse',
                roles:[]
            }
        }
        
        return{
            errCode:0,
            message:'Get roles succsess',
            roles
        }
        
    } catch (error) {
        console.log('Error server');
        return{
            errCode:-1,
            message:"Get roles failse. Error server"
        }
    }
}

const createRoles = async(roles)=>{
    try {
        if(!roles){
            return{
                errCode:1,
                message:"Not params"
            }
        }
        const rolesInData = await db.Role.findAll({
            raw:true,
        })
        console.log('check rolesIndata>>>',rolesInData);
        const rolesPost = roles.filter(role=>!(rolesInData.some(item=>item.url===role.url)))
        await db.Role.bulkCreate(rolesPost)

        return{
            errCode:0,
            message:`Create roles ${rolesPost.length} success.`
        }
        
    } catch (error) {
        console.log('Error server');
        return{
            errCode:-1,
            message:"Create roles failse. Error server"
        }
    }
}

module.exports = {getRoles,createRoles}