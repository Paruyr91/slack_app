
const jwt=require('jsonwebtoken')
const secret =process.env.SECRET_TOKEN_KEY


module.exports=function checktoken(req,res,next){
    if(req.path==='/signin' || req.path==='/signup'){
        next()
    }else if (req.headers.authorization) {
                try{
                    let [tokenname, token]=req.headers.authorization.split(' ')
                    if(tokenname!=="Bearer")throw "Token is absent"
                    let decoded = jwt.verify(token, secret ) 
                    req.decoded={... decoded.user}
                    return next()
                }catch(error){
                    console.log(error.message);
                    if(error.message == "Signature verification failed") resolve(false);
                    return res.status(301).send(error)
                } 
    }else{
        res.status(301).send({
            name: "JsonWebTokenError",
            message: "Token is absent"
        })
    } 
}