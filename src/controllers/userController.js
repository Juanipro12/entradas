import Usuario from "../models/usuario";
import { generarToken } from "../utils/user";

const iniciarSesion = async (req, res) => {
    try {
      const { correo } = req.body;

      const usuario = await Usuario.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      const token = generarToken(usuario);
      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión', ...error });
    }
  };

  export const registrarUsuario = async (req, res) => {
    try {
      const { correo, role } = req.body;
  
      const nombreUsuario = correo.split('@')[0] + Math.floor(Math.random() * 1000);
  
      const nuevoUsuario = await Usuario.create({
        nombreUsuario,
        correo,
        role,
      });
  
      const token = generarToken(nuevoUsuario)
  
      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        usuario: {
          id: nuevoUsuario.id,
          nombreUsuario: nuevoUsuario.nombreUsuario,
          correo: nuevoUsuario.correo,
          role: nuevoUsuario.role,
        },
        token,
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  };

export { iniciarSesion, registrarUsuario };