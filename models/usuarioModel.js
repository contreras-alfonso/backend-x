import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    confirmado:{
        type: Boolean,
        default:false,
    },
    status:{
        type:String,
        default:1,
    }
},{
    timestamps:true,
})

const Usuario = mongoose.model('Loco',usuarioSchema);
export default Usuario;