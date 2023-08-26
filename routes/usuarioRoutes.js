import express from 'express'
import { iniciarSesion,registrarUsuario,confirmarCuenta,recuperarCuenta,actualizarPasswordToken,actualizarPassword,perfil } from '../controllers/usuarioController.js';
import verificarAuth from '../middlewares/verificarAuth.js';

const router = express.Router();

router.post('/iniciar-sesion',iniciarSesion);
router.post('/registrar',registrarUsuario)
router.get('/confirmar-cuenta/:token',confirmarCuenta)
router.post('/recuperar-cuenta',recuperarCuenta)
router.get('/actualizar-password/:token',actualizarPasswordToken)
router.post('/actualizar-password/:token',actualizarPassword)
router.get('/perfil',verificarAuth,perfil)


export default router;