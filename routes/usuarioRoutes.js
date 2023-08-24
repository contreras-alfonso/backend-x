import express from 'express'
import { iniciarSesion,registrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login',iniciarSesion);
router.post('/registrar',registrarUsuario)

export default router;