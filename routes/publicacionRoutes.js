import express from 'express';
import { nuevaPublicacion,obtenerPublicaciones } from '../controllers/publicacionController.js';
import verificarAuth from '../middlewares/verificarAuth.js';

const router = express.Router();

router.post('/nueva-publicacion',verificarAuth,nuevaPublicacion);
router.get('/obtener-publicaciones',verificarAuth,obtenerPublicaciones);

export default router;