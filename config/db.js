import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.CONEXION_MONGO)
        console.log('Conectado a MONGO DB')
    } catch (error) {
        console.log(error)
    }
}

export default conectarDB