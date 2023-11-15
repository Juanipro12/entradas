import Usuario from "../models/usuario.js";
import { generarToken } from "../utils/user.js";
import jwt from 'jsonwebtoken';

const iniciarSesion = async (req, res) => {
  try {
    const { email, role } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      const nombre = email.split('@')[0] + Math.floor(Math.random() * 1000);

      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        role,
      });

      usuario = nuevoUsuario;

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          role: nuevoUsuario.role,
        },
        token: generarToken(nuevoUsuario),
      });
    } else {
      const token = generarToken(usuario);
      res.json({
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          role: usuario.role,
        },
        token,
      });
    }
  } catch (error) {
    console.error('Error al gestionar el usuario:', error);
    res.status(500).json({ error: 'Error al gestionar el usuario' });
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'key');

    const usuario = await Usuario.findOne({ where: { id: decoded.id } });

    const userData = usuario;

    return res.json({
      usuario: {
        id: userData.id,
        nombre: userData.nombre,
        email: userData.email,
        role: userData.role,
      }
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }

    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
export { iniciarSesion, getUser };