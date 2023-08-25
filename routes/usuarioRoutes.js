import express from 'express'
import { iniciarSesion,registrarUsuario,confirmarCuenta,recuperarCuenta } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login',iniciarSesion);
router.post('/registrar',registrarUsuario)
router.get('/confirmar-cuenta/:token',confirmarCuenta)
router.post('/recuperar-cuenta',recuperarCuenta)

export default router;