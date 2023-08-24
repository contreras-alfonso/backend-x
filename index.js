import express from 'express'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarioRoutes.js'
import conectarDB from './config/db.js'

const app = express()

app.use(express.json())

dotenv.config()

conectarDB();

app.use('/api/usuarios',usuarioRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Proyecto correcto. ${process.env.PORT}`)
})