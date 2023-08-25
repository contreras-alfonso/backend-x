import express from 'express'
import { iniciarSesion,registrarUsuario,confirmarCuenta,recuperarCuenta,actualizarPasswordToken,actualizarPassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/iniciar-sesion',iniciarSesion);
router.post('/registrar',registrarUsuario)
router.get('/confirmar-cuenta/:token',confirmarCuenta)
router.post('/recuperar-cuenta',recuperarCuenta)
router.get('/actualizar-password/:token',actualizarPasswordToken)
router.post('/actualizar-password/:token',actualizarPassword)

export default router;