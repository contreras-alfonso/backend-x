import express from 'express';
import { nuevaPublicacion,obtenerPublicaciones,eliminarPublicacion,editarPublicacion } from '../controllers/publicacionController.js';
import verificarAuth from '../middlewares/verificarAuth.js';

const router = express.Router();

router.post('/nueva-publicacion',verificarAuth,nuevaPublicacion);
router.get('/obtener-publicaciones',verificarAuth,obtenerPublicaciones);
router.delete('/eliminar-publicacion',verificarAuth,eliminarPublicacion);
router.put('/editar-publicacion',verificarAuth,editarPublicacion);

export default router;