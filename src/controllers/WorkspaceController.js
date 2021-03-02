const WorkspaceService = require('../services/WorkspaceService')

class WorkspaceController {

  async addWorkspace(req,res){
        try {
            const Workspace = await  WorkspaceService.addWorkspace(req.user, req.body);
            return res.send(Workspace);
        } catch (err) {
            return res.status(400).send({ success: false, error: err });
        }
    }
  
  async getWorkspace(req,res){
    try {
        const Workspace = await  WorkspaceService.getWorkspace(req.user, req.params.id);
        return res.send(Workspace);
    } catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, error: err });
    }

  }
  async updateWorkspace(req,res){
    try {
        const Workspace = await  WorkspaceService.updateWorkspace(req.user, req.params.id,req.body);
        return res.send(Workspace);
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }
  }
  async deleteWorkspace(req,res){
    try {
         await  WorkspaceService.deleteWorkspace(req.user, req.params.id);
         return res.send({ success: true});
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }
  }



}

module.exports = new WorkspaceController