import Publicacion from "../models/publicacionModel.js";

const nuevaPublicacion = async (req,res) => {
    const {texto:contenido} = req.body;
    if(contenido.length<=0){
        return res.json({status:false,msg:'Primero debes escribir algo.'})
    }
    const publicacion = new Publicacion();
    publicacion.contenido = contenido;
    publicacion.creador = req.usuario._id;

    try {
        const proyectoGuardado = await publicacion.save();
        const data = await Publicacion.findById(proyectoGuardado._id).populate('creador','email nombre');
        return res.json({status:true,msg:'Publicación creada correctamente :)',data});
    } catch (error) {
        return res.json({status:false,msg:'Ocurrió un error al querer crear una publicación, intenta más tarde.'})
    }
}

const obtenerPublicaciones = async (req,res) => {
    const publicaciones = await Publicacion.find({creador:req.usuario._id}).populate('creador','email nombre');
    res.json(publicaciones);
}

export{
    nuevaPublicacion,
    obtenerPublicaciones,
}