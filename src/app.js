import express from 'express';
import bodyParser from 'body-parser'
import  dotenv from "dotenv";
import router from './routers/apirouter.js'

const app = express();
const PORT=process.env.PORT || 8080

dotenv.config();



app.use(express.static('src/public'))
app.use(bodyParser.urlencoded({
    extended:false,
}))

app.use(bodyParser.json())
app.use(express.json());

 



app.use(router)


app.listen(PORT, ()=>{
      console.log(`server started at${PORT}`)
 }) 
 
   
 

