import jwt from 'jsonwebtoken'
import Usuario from '../models/usuarioModel.js';

const verificarAuth = async (req,res,next) => {

    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.usuario = await Usuario.findOne({_id:decoded.id}).select("-password -token -confirmado -createdAt -updatedAt -__v");

            console.log(req.usuario);

            next()

        } catch (error) {
            return res.json({status:false,msg:'Token no válido(?)'})
        }
    }

    if(!token){
        res.json({status:false,msg:"Token no válido"})
        return;
    }

}

export default verificarAuth;