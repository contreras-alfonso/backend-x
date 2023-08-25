import bcrypt from 'bcrypt'
import Usuario from "../models/usuarioModel.js"
import { generarToken,generarJWT } from "../helpers/helpers.js"
import enviarEmailVerificacionCuenta from '../helpers/enviarCorreoVerificacion.js'
import enviarCorreoOlvidoPassword from '../helpers/enviarCorreoOlvidoPassword.js'

const iniciarSesion = async(req,res)=>{

    const {email,password} = req.body;
    //verificar si los campos están vacios
    if([password,email].includes('')){
        return res.json({status:false,msg:'Todos los campos son obligatorios.'});
    }
    const usuario = await Usuario.findOne({email});
    //verificar si existe algun usuario con dicho email
    if(!usuario?._id){
        return res.json({status:false,msg:'Usuario o contraseña incorrecta.'});
    }
     //verificar si el usuario no está confirmado
    if(!usuario?.confirmado){
        return res.json({status:false,msg:'Primero debes confirmar tu cuenta.'});
    }
    //verificar si el password es el correcto
    const verificarPas = await bcrypt.compare(password,usuario.password);

    if(!verificarPas){
        return res.json({status:false,msg:'Usuario o contraseña incorrecta.'});
    }

    const jwt = generarJWT(usuario.nombre,usuario.email)

    return res.json({
        status:true,
        msg:'Sesión iniciada correctamente.',
        id:usuario.id,
        email:usuario.email,
        nombre:usuario.nombre,
        jwt
    });


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

    if(existeUsuario?._id){
        return res.json({status:false,msg:'El usuario ingresado ya existe.'});
    }

    try {
        usuario.password = await bcrypt.hash(usuario.password,10);
        usuario.token = generarToken();
        const usuarioAlmacenado = await usuario.save();
        enviarEmailVerificacionCuenta(usuario.nombre,usuario.token)
        return res.json({status:true,msg:'Confirma tu cuenta, revisa tu bandeja de entrada.'});

    } catch (error) {
        console.log(error)
    }
}

const confirmarCuenta = async(req,res)=>{

    const {token} = req.params;
    const usuario = await Usuario.findOne({token});

    //validar que exista el usuario con dicho token
    if(!usuario?._id){
        return res.json({status:false,msg:'Token inválido.'});
    }

    try {
        usuario.confirmado = true;
        usuario.token = '';
        await usuario.save();
        return res.json({status:true,msg:'Tu cuenta ha sido confirmada con éxito.'});

    } catch (error) {
        console.log(error)
    }
}

const recuperarCuenta = async (req,res)=>{

    const {email} = req.body;

    if(!email){
        return res.json({status:false,msg:'Debes ingresar primero un email.'});
    }
    
    const usuario = await Usuario.findOne({email});

    if(!usuario?._id){
        return res.json({status:false,msg:'No existe ninguna cuenta asociada a dicho correo.'});
    }

    if(!usuario.confirmado){
        return res.json({status:false,msg:'Primero debes confirmar tu cuenta.'});
    }

    try {
        usuario.token = generarToken();
        await usuario.save();
        enviarCorreoOlvidoPassword(usuario.nombre,usuario.token);
        return res.json({status:true,msg:'Se han enviado las instrucciones a tu correo.'});


    } catch (error) {
        console.log(error)
    }

}

const actualizarPasswordToken = async (req,res) => {

    const {token} = req.params;
    const usuario = await Usuario.findOne({token});

    if(!usuario?._id){
        return res.json({status:false,msg:'Token inválido.'});
    }
    if(!usuario?.confirmado){
        return res.json({status:false,msg:'Primero debes confirmar tu cuenta.'});
    }

    return res.json({status:true,msg:'Token válido.'});

}

const actualizarPassword = async(req,res)=>{

    const {token} = req.params;
    const usuario = await Usuario.findOne({token});

    if(!usuario?._id){
        return res.json({status:false,msg:'Token inválido.'});
    }
    if(!usuario?.confirmado){
        return res.json({status:false,msg:'Primero debes confirmar tu cuenta.'});
    }
    
    const {password} = req.body;

    try {
        usuario.password = await bcrypt.hash(password,10);
        usuario.token = '';
        await usuario.save();
        return res.json({status:true,msg:'Tu password ha sido actualizado correctamente.'});

    } catch (error) {
        console.log(error)
    }
    


}

export{
    iniciarSesion,
    registrarUsuario,
    confirmarCuenta,
    recuperarCuenta,
    actualizarPasswordToken,
    actualizarPassword,
}