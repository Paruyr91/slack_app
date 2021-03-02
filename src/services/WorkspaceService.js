const DB = require('../models/DB_associations')

class WorkspaceService {

    addWorkspace(user, body){
        return DB.Workspace.create({
            uniqname: body.uniqname,
            companyname: body.companyname,
            Created_by: user.id
        }).then(workspace => {
            workspace.addMemberId(user.id)
            return { success: true,workspace }
        })
    }
   async getWorkspace(user,id){
        let exist= await DB.Workspace.findOne({
            where:{ id},
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
          return  await DB.Workspace.findOne({
                where:{ id},
                include: [{
                    required:false,
                    model:DB.User,
                    as:'memberId',
                    attributes : ['id','fullname','displayname','whatIdo','phonenumber','profilimage']
                  }],
                  include: [{
                    required:false,
                    model:DB.Chenal,
                  }]
            })
        }else throw 'Woekcpace not found'
    }

    async updateWorkspace(user, id, body){
      let workspace=  await DB.Workspace.findOne({
            where:{ id, Created_by:user.id }
        })
        if(workspace){
           body.uniqname?workspace.uniqname=body.uniqname:null
           body.companyname?workspace.companyname=body.companyname:null
           return workspace.save()
        }else throw 'Woekcpace not found'
    }

    async deleteWorkspace(user, id){
        let workspace= await DB.Workspace.findOne({
            where:{ id, Created_by:user.id }
        })
        if(workspace){
           return workspace.destroy()
        }else throw 'Woekcpace not found'
    }

}

module.exports = new WorkspaceService