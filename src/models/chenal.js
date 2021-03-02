const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = require('./index')

const Chenal = sequelize.define("chenal", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            len: [3, 80],
            async isunique(value) {
                let oldspace = await Chenal.findOne({
                    where: {name: value, }
                })
                if (oldspace) {
                    throw new Error('name address already in use!');
                }
            }
        }
    }
});


module.exports = Chenal

