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

const corsOptions = {
    origin: "*"
} 

app.use(cors(corsOptions))

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/publicaciones',publicacionRoutes);



app.listen(process.env.PORT,()=>{
    console.log(`Proyecto correcto. ${process.env.PORT}`)
})