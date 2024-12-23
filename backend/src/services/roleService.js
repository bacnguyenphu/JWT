const { where } = require('sequelize/dist/index.js')
const db = require('../models')

const getRoles = async () => {
    try {
        const roles = await db.Role.findAll({
            raw: true,
            order: [
                ['id', 'DESC'],
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })
        if (!roles) {
            return {
                errCode: 1,
                message: 'Get roles failse',
                roles: []
            }
        }

        return {
            errCode: 0,
            message: 'Get roles succsess',
            roles
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Get roles failse. Error server"
        }
    }
}

const createRoles = async (roles) => {
    try {
        if (!roles) {
            return {
                errCode: 1,
                message: "Not params"
            }
        }
        const rolesInData = await db.Role.findAll({
            raw: true,
        })
        console.log('check rolesIndata>>>', rolesInData);
        const rolesPost = roles.filter(role => !(rolesInData.some(item => item.url === role.url)))
        if (rolesPost?.length > 0) {
            await db.Role.bulkCreate(rolesPost)
        }
        else {
            return {
                errCode: 2,
                message: `Role is exist`
            }
        }

        return {
            errCode: 0,
            message: `Create roles ${rolesPost.length} success.`
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Create roles failse. Error server"
        }
    }
}

const deleteRole = async (id) => {
    console.log('check id>>>>', id);

    try {
        if (!id) {
            return {
                errCode: 1,
                message: "ID is required"
            }
        }

        const role = db.Role.findOne({
            where: { id: id }
        })

        if (!role) {
            return {
                errCode: 2,
                message: "Role is not exist"
            }
        }

        await db.Role.destroy({
            where: { id: id }
        })

        return {
            errCode: 0,
            message: "Delete role success"
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Delete role failse. Error server"
        }
    }
}

const getRolebyIdGroup = async (id) => {
    try {

        if (!id) {
            return {
                errCode: 1,
                message: "ID is required"
            }
        }

        const roles = await db.Group.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: db.Role,
                    as: "roles",
                    attributes: ['id', 'url', 'description'],
                    through: { attributes: [] }
                }
            ],
        })

        return {
            errCode: 0,
            message: "Get role by id group success",
            group: roles
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Delete role failse. Error server"
        }
    }
}

module.exports = { getRoles, createRoles, deleteRole, getRolebyIdGroup }