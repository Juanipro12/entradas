import express from 'express';
import { iniciarSesion, registrarUsuario } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/login', iniciarSesion);

userRoutes.post('/register', registrarUsuario);

export default userRoutes;