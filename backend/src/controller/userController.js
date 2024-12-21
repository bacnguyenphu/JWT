const { register, login, getUser, getUserWithPagination, deleteUser, getGroups, createUser, editUser, getUserById } = require('../services/userService')

const handleRegister = async (req, res) => {
    const data = req.body
    const message = await register(data)
    return res.status(200).json(message)
}

const handleLogin = async (req, res) => {
    const data = req.body
    const message = await login(data)
    if (message && message.access_token) {
        res.cookie('jwt', message.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
    }

    return res.status(200).json(message)
}

const handleGetGroups = async (req, res) => {
    const message = await getGroups()
    return res.status(200).json(message)
}

const handleGetUser = async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    if (req.query.page && req.query.limit) {
        const message = await getUserWithPagination(+page, +limit)
        return res.status(200).json(message)
    }

    const message = await getUser()
    return res.status(200).json(message)
}

const handleGetUserById = async (req, res) => {
    if (req.query.id) {
        const message = await getUserById(+req.query.id)
        return res.status(200).json(message)
    }
}

const handleDeleteUser = async (req, res) => {
    const id = req.query.id

    const message = await deleteUser(id)
    return res.status(200).json(message)
}

const handleCreateUser = async (req, res) => {
    const data = req.body

    const message = await createUser(data)
    return res.status(200).json(message)
}

const handleEditUser = async (req, res) => {
    const data = req.body
    const message = await editUser(data)
    return res.status(200).json(message)
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            errCode: 0,
            message: "Logout succsess",
        })
    } catch (error) {
        console.log('Error server');
        return res.status(200).json({
            errCode: -1,
            message: "Logout failse",
        })
    }
}

module.exports = { handleRegister, handleLogin, handleGetUser, handleDeleteUser, handleGetGroups, handleCreateUser, handleEditUser, handleGetUserById, handleLogout }