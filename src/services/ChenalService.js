const DB = require('../models/DB_associations')

class ChenalService {

    async addChenal(user, body, spaceid){
        let exist= await DB.Workspace.findOne({
            where:{ id:spaceid},
            include: [{
                required:true,
                model:DB.User, 
                where:{
                    id:user.id
                },
                attributes : ['id']
              }]
        })

        if(exist){
            return DB.Chenal.create({
                name: body.name,
                Created_by: user.id,
                workspaceId:spaceid
            }).then(chenal => {
                return { success: true,chenal}
            })
        }else throw 'Woekcpace not found'
    }

   async getChenal(user,params){
    let exist= await DB.Workspace.findOne({
        where:{ id:params.spaceid},
        include: [{
            required:true,
            model:DB.User, 
            where:{
                id:user.id
            },
            attributes : ['id']
          }]
    })

    if(exist){
        return DB.Chenal.findOne({
            where:{ id:params.id },
        }).then(chenal => {
            return { success: true,chenal}
        })
    }else throw 'Woekcpace not found'
       
    }

    async updateChenal(user, id, body){
        let chenal= await DB.Chenal.findOne({
            where:{ id, Created_by:user.id }
        })
        if(chenal){
           body.name?chenal.name=body.name:null
           return chenal.save()
        }else throw 'Chenal not found'
    }

    async deleteChenal(user, id){
        let chenal= await DB.Chenal.findOne({
            where:{ id, Created_by:user.id }
        })
        if(chenal){
           return chenal.destroy()
        }else throw 'Chenal not found'
    }

}

module.exports = new ChenalService