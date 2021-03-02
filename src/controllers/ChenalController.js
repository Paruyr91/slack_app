const ChenalService=require('../services/ChenalService')

class ChenalController {

  async addChenal(req,res){
        try {
            const Chenal = await  ChenalService.addChenal(req.user, req.body,req.params.spaceid);
            return res.send(Chenal);
        } catch (err) {
            return res.status(400).send({ success: false, error: err });
        }
    }
  
  async getChenal(req,res){
    try {
        const Chenal = await  ChenalService.getChenal(req.user, req.params);
        return res.send(Chenal);
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }

  }
  async updateChenal(req,res){
    try {
        const Chenal = await  ChenalService.updateChenal(req.user, req.params.id,req.body);
        return res.send(Chenal);
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }
  }
  async deleteChenal(req,res){
    try {
         await  ChenalService.deleteChenal(req.user, req.params.id);
         return res.send({ success: true});
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }
  }



}

module.exports = new ChenalController