import express from 'express';
import { crearEvento, getEventos } from '../controllers/eventoController.js';
import { verificarToken } from '../utils/middleware.js';

const eventoRoutes = express.Router();

eventoRoutes.post('/create-eventos', verificarToken, crearEvento);

eventoRoutes.get('/eventos', getEventos);


export default eventoRoutes;
