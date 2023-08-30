import Publicacion from "../models/publicacionModel.js";

const nuevaPublicacion = async (req,res) => {
    const {texto:contenido} = req.body;
    if(contenido.length<=0){
        return res.json({status:false,msg:'Primero debes escribir algo.'})
    }
    const publicacion = new Publicacion();

    publicacion.contenido = contenido;
    publicacion.creador = req.usuario._id;
    publicacion.horaPublicada = Date.now();


    try {
        const proyectoGuardado = await publicacion.save();
        const data = await Publicacion.findById(proyectoGuardado._id).populate('creador','email nombre');
        return res.json({status:true,msg:'Publicación creada correctamente :)',data});
    } catch (error) {
        return res.json({status:false,msg:'Ocurrió un error al querer crear una publicación, intenta más tarde.'})
    }
}

const obtenerPublicaciones = async (req,res) => {
    const publicaciones = await Publicacion.find({creador:req.usuario._id})
    res.json(publicaciones);
}

const eliminarPublicacion = async (req,res) => {
    const {id} = req.body;
    const publicacion = await Publicacion.findById(id);
    if(!publicacion.creador.equals(req.usuario._id)){
        res.json({status:false,msg:'Acción no válida.'})
    }
    try {
        await publicacion.deleteOne() 
        res.json({status:true,msg:'Publicación eliminada correctamente.'})

    } catch (error) {
      
        res.json({status:false,msg:'Surgio un error al eliminar la publicación.'})
    }
}

const editarPublicacion = async (req,res) => {
    const {contenido,id} = req.body;
    const publicacion = await Publicacion.findById(id);

    if(!publicacion.creador.equals(req.usuario._id)){
        res.json({status:false,msg:'Acción no válida.'})
    }

    try {

        publicacion.contenido = contenido || publicacion.contenido;
        const publicacionEditada = await publicacion.save();
        res.json({status:true,msg:'Publicación editada correctamente.',data:publicacionEditada})

    } catch (error) {
        res.json({status:false,msg:'Ocurrió un error al editar.'})

    }
}

export{
    nuevaPublicacion,
    obtenerPublicaciones,
    eliminarPublicacion,
    editarPublicacion,
}