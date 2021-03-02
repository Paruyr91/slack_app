const User= require('./user')
const Workspace=require('./workspace')
const Chenal =require('./chenal')

Workspace.belongsTo(User,{ 
    foreignKey: 'Created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

Workspace.belongsToMany(User,{ 
    as: 'memberId', 
    through: 'members',
    foreignKey: 'workspaceId',
    onDelete: 'CASCADE'
    });

Chenal.belongsTo(User,{ 
    foreignKey: 'Created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    });


Workspace.hasMany(Chenal,{
    foreignKey: {
        allowNull: false
    }, 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    });


const DB = {
    User,
    Workspace,
    Chenal
}

module.exports = DB