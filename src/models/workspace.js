const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = require('./index')

const Workspace = sequelize.define("workspace", {
    uniqname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            len: [3, 80],
            async isunique(value) {
                let oldspace = await Workspace.findOne({
                    where: {uniqname: value, }
                })
                if (oldspace) {
                    throw new Error('uniqname address already in use!');
                }
            }
        }
    },
    companyname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255]
        }
    }
});


module.exports = Workspace

