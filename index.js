import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usuarioRoutes from './routes/usuarioRoutes.js'
import publicacionRoutes from './routes/publicacionRoutes.js'
import conectarDB from './config/db.js'

const app = express()

app.use(express.json())

dotenv.config()

conectarDB();

const whitelist = [process.env.FRONTEND_URL,"https://api.sendgrid.com","https://web.postman.co"]

const corsOptions = {
    origin: function(origin,callback){
        console.log(origin)
        if(whitelist.includes(origin)){
            // Pueda Consultar la API
            callback(null,true);
        }else{
            // No está permitido
            callback(new Error('Error de Cors'))
        }
    } 
} 

app.use(cors(corsOptions))

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/publicaciones',publicacionRoutes);
app.use('/',(req,res)=>{
    res.json({msg:'Server ON'})
});


app.listen(process.env.PORT,()=>{
    console.log(`Proyecto correcto. ${process.env.PORT}`)
})