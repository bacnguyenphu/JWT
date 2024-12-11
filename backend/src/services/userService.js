const { where } = require('sequelize/lib/sequelize');
const db = require('../models/index')
const bcrypt = require('bcrypt');
const { raw } = require('mysql2');
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

const register = async (data) => {
    try {

        if(!data.email||!data.username||!data.phone||!data.password){
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

        if(await checkPhone(data.phone)){
            return{
                errCode: 2,
                message: "Phonenumber is used",
            }
        }

        const password = await hashPassword(data.password)
        await db.User.create({
            email: data.email,
            password: password,
            username: data.username,
            phone:data.phone,
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

const getUser = async () => {
    try {
        const user = await db.User.findOne({
            where: {
                id: 1
            },
            raw: true,
            nest: true,
            include: [
                { model: db.Group, as: "group" }
            ],

        })

        console.log('check get user>>', user);

        const role = await db.Role.findAll({
            include: { model: db.Group,as:"groups", where: { id: 1 } },
            raw: true,
            nest: true,
        })

        console.log('check role>>',role);
        



        return {
            errCode: 0,
            message: "Get user succsess",
            data: role
        }

    } catch (error) {
        console.log('Error server');
        return {
            errCode: -1,
            message: "Error server"
        }
    }
}

module.exports = { register, getUser }