import mongoose from "mongoose";

const publicacionSchema = mongoose.Schema({
    contenido:{
        type:String,
        required:true,
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Loco",
    },
    favorito:{
        type:Boolean,
        default:false,
    }
})

const Publicacion = mongoose.model('Twr',publicacionSchema);
export default Publicacion;