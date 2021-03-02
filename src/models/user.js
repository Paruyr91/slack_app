const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = require('./index')
const bcrypt = require('bcrypt');

let hashNumber = Number(process.env.PASSWORD_HASH_NUMBER)
let salt = hashNumber ? hashNumber : 10

const User = sequelize.define("users", {
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
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAlphanumeric: true,
            len: [0, 80]
        }
    },
    displayname: {
        type: DataTypes.STRING,

        allowNull: true,
        validate: {
            isAlphanumeric: true,
            len: [0, 80]
        },
        get() {
            const displayname = this.getDataValue('displayname');
            const nth = this.getDataValue('nth');
            if (displayname && !nth) {
                return displayname
            } else if (displayname && nth) {
                return displayname + nth
            } else return null

        },
    },
    nth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    whatIdo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 250]
        }
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 98]
        }
    },
    profilimage: {
        type: DataTypes.JSON,
        allowNull: true
    }
});




User.beforeCreate(async (user) => {
    user.password = await bcrypt.hashSync(user.password, salt);
});

User.beforeUpdate(async (user) => {
    if (user.dataValues.password !== user._previousDataValues.password) {
        user.password = await bcrypt.hashSync(user.password, salt);
    }

   let users=await User.findAll({
        where:{  displayname:user.dataValues.displayname  }
    })
   
    
        users=users.filter(a=>a.id!==user.id)
        users.sort((a,b)=>b.nth-a.nth)
        if(users[0]){
            user.nth=users[0].nth+1
        }
   
});  


module.exports = User
