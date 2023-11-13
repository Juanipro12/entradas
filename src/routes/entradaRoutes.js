import express from 'express';
import { generarQR, getEntradas, usarEntrada } from '../controllers/entradaController.js';
import { verificarToken } from '../utils/middleware.js';

const router = express.Router();

router.post('/entradas/generar-qr', verificarToken, generarQR);

router.post('/usar-entrada', verificarToken, usarEntrada);

router.get('/entradas', verificarToken, getEntradas);


export default router;
