
const express= require('express')
const  bodyParser=require("body-parser")
require('dotenv').config()
const router =require('./routers/apirouter')
const app = express();
const PORT=process.env.PORT || 8080


 

app.use(express.static('src/public'))
app.use(bodyParser.urlencoded({
    extended:false,
}))

app.use(bodyParser.json())
app.use(express.json());

 



// app.use(router)


app.listen(PORT, ()=>{
      console.log(`server started at${PORT}`)
 }) 
 
   
 

