
import DataTypes from "sequelize";
import bcrypt from 'bcrypt'
import sequelize from './index.js'
let hashNumber= Number(process.env.PASSWORD_HASH_NUMBER)
let salt= hashNumber?hashNumber:10

const User = sequelize.define("users", {
    // name: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            async isunique(value) {
                let olduser = await User.findOne({
                    where: {
                        email: value,
                    }
                })
                if (olduser) {
                    throw new Error('Email address already in use!');
                }
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5],
                msg: "Password must be more then 5 leaters"
              } 
         
        }
    },
});

User.beforeCreate(async (user) => {
    console.log(hashNumber)
    user.password = await bcrypt.hashSync(user.password, salt);
});

User.beforeUpdate(async (user) => {
    if (user.dataValues.password !== user._previousDataValues.password) {
        user.password = await bcrypt.hashSync(user.password,salt);
    }
});

export default User