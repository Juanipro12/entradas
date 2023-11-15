import express from 'express';
import { iniciarSesion, getUser } from '../controllers/userController.js';
import { verificarToken } from '../utils/middleware.js';

const userRoutes = express.Router();

userRoutes.post('/login', iniciarSesion);

userRoutes.get('/get-user', verificarToken, getUser);


export default userRoutes;