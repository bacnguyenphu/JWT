const { where } = require('sequelize/lib/sequelize');
const db = require('../models/index')
const bcrypt = require('bcrypt');
const { raw } = require('mysql2');
const { getGroupsWithRoles } = require('./JWTservices');
const { createJWT } = require('../middleware/JWTaction');
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

const checkPhone = async (phoneUser) => {
    if (phoneUser) {
        let user = await db.User.findOne({ where: { phone: phoneUser }, raw: true });

        if (user) {
            return true
        }
        else return false
    }
}

const checkPassword = async (password, passIndata) => {
    if (password) {
        const check = await bcrypt.compareSync(password, passIndata);
        if (check) {
            return true
        }
        else {
            return false
        }
    }
}

const register = async (data) => {
    try {

        if (!data.email || !data.username || !data.phone || !data.password) {
            return {
                errCode: 3,
                message: "Missing required parameters",
            }
        }

        if (await checkEmail(data.email)) {
            return {
                errCode: 1,
                message: "Email is used",
            }
        }

        if (await checkPhone(data.phone)) {
            return {
                errCode: 2,
                message: "Phonenumber is used",
            }
        }

        const password = await hashPassword(data.password)
        await db.User.create({
            email: data.email,
            password: password,
            username: data.username,
            phone: data.phone,
            groupId:4
        })
        return {
            errCode: 0,
            message: "Register success",
        }


    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const login = async (data) => {
    try {
        if (!await checkEmail(data.email)) {
            return {
                errCode: 1,
                message: "Email does not exist"
            }
        }
        else {
            let user = await db.User.findOne({
                where: { email: data.email },
                raw: true,
            });

            if (!await checkPassword(data.password, user.password)) {
                return {
                    errCode: 2,
                    message: "Incorrect password",
                }
            }

            const roles = await getGroupsWithRoles(user)
            const payload = {
                user: {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    sex: user.sex,
                    address: user.address,
                    groupId: user.groupId,
                    id: user.id
                },
                group:roles
            }

            const access_token = createJWT(payload)

            return {
                errCode: 0,
                message: "Login succsess",
                access_token,
                user: {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    sex: user.sex,
                    address: user.address,
                    groupId: user.groupId,
                    id: user.id
                },
                group:roles
            }

        }


    } catch (error) {
        console.log("error server");
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const getUser = async () => {
    try {
        const user = await db.User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            raw: true,
            nest: true,
            include: [
                { model: db.Group, as: "group", attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ],

        })

        return {
            errCode: 0,
            message: "Get user succsess",
            data: user
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {

        const offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({

            offset: offset,
            limit: limit,
        });

        return {
            errCode: 0,
            message: "Get user success",
            data: {
                totalPages: Math.ceil(count / limit),
                totalRows: count,
                users: rows
            }
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const getUserById = async (id) => {
    try {

        if (!id) {
            return {
                errCode: 1,
                message: "ID is required"
            }
        }
        const user = await db.User.findOne(
            {
                where: { id: id },
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            },
        )
        return {
            errCode: 0,
            message: "Get user by ID success",
            user
        }


    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const deleteUser = async (id) => {

    try {
        if (!id) {
            return {
                errCode: 1,
                message: "Id is required"
            }
        }

        const user = await db.User.findOne({
            where: { id: id }
        })

        if (!user) {
            return {
                errCode: 2,
                message: "User is not exist"
            }
        }

        await db.User.destroy({
            where: { id: id }
        })

        return {
            errCode: 0,
            message: "Delete user success"
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const getGroups = async () => {
    try {
        const groups = await db.Group.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        return {
            errCode: 0,
            message: "Get groups succsess",
            groups: groups
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const createUser = async (data) => {
    try {
        if (!data.email || !data.username || !data.phone || !data.password || !data.groupId) {
            return {
                errCode: 3,
                message: "Missing required parameters",
            }
        }

        if (await checkEmail(data.email)) {
            return {
                errCode: 1,
                message: "Email is used",
            }
        }

        if (await checkPhone(data.phone)) {
            return {
                errCode: 2,
                message: "Phonenumber is used",
            }
        }

        const password = await hashPassword(data.password)
        await db.User.create({
            email: data.email,
            password: password,
            username: data.username,
            phone: data.phone,
            address: data.address,
            sex: data.sex,
            groupId: data.groupId
        })
        return {
            errCode: 0,
            message: "Create user success",
        }
    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

const editUser = async (data) => {
    try {
        if (!data.email || !data.username || !data.phone || !data.password || !data.groupId) {
            return {
                errCode: 1,
                message: "Missing required parameters",
            }
        }
        if (!data.id) {
            return {
                errCode: 2,
                message: "Id is required",
            }
        }

        const password = await hashPassword(data.password)

        await db.User.update(
            {
                email: data.email,
                password: password,
                username: data.username,
                phone: data.phone,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            },
            {
                where: {
                    id: data.id,
                },
            },
        );

        return {
            errCode: 0,
            message: "Edit user success",
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

module.exports = { register, login, getUser, getUserWithPagination, deleteUser, getGroups, createUser, editUser, getUserById }