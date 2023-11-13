import jwt from 'jsonwebtoken';

export const generarToken = (usuario) => {
  const token = jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      role: usuario.role,
    },
    'key', 
    { expiresIn: '1h' } 
  );
  return token;
};