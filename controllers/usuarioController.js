import Usuario from "../models/usuarioModel.js"
import { generarToken } from "../helpers/helpers.js"

const iniciarSesion = async(req,res)=>{
    res.json({msg:'Correctamente correcto'})
}

const registrarUsuario = async(req,res)=>{
    
    const {nombre,password,email} = req.body;
    const usuario = new Usuario(req.body);

    //validar si hay campos vacíos
    if([nombre,password,email].includes('')){
        return res.json({status:false,msg:'Todos los campos son obligatorios.'});
    }

    //validar si existe un email

    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario._id){
        return res.json({status:false,msg:'El usuario ingresado ya existe.'});
    }

    try {
        usuario.token = generarToken();
        const usuarioAlmacenado = await usuario.save();
        return res.json({status:true,msg:'Usuario creado correctamente.',data:usuarioAlmacenado});

    } catch (error) {
        console.log(error)
    }
}

export{
    iniciarSesion,
    registrarUsuario,
}