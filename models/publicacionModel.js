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
    horaPublicada:{
        type:String,
        required:true,
    },
    favorito:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,
})

const Publicacion = mongoose.model('Twr',publicacionSchema);
export default Publicacion;