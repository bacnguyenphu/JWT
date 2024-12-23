const db = require("../models");

const getGroupsWithRoles = async (user) => {
    try {
        const roles = await db.Group.findOne({
            where: {
                id: user.groupId
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

        return roles ? roles : {}

    } catch (error) {
        console.log('Lỗi không lấy được RoleGroups');
    }
}

module.exports = { getGroupsWithRoles }