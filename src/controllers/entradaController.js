import Entrada from '../models/entrada.js';
import qrCode from 'qrcode';

const generarQR = async (req, res) => {
  try {
    const { eventoId } = req.body;

    if (req.usuario.role !== 'normal') {
        return res.status(403).json({ error: 'Acceso no autorizado. Se requiere un usuario normal.' });
      }
  
    const qrData = `Entrada para el Evento: ${eventoId}`;
    const qrCodeBuffer = await qrCode.toBuffer(qrData);

    const nuevaEntrada = await Entrada.create({ qr: qrCodeBuffer, eventoId });

    const qrCodeBase64 = qrCodeBuffer.toString('base64');

    res.status(201).json({ ...nuevaEntrada.toJSON(), qrCodeBase64 });
  } catch (error) {
    console.error('Error al generar el QR para la entrada:', error);
    res.status(500).json({ error: 'Error al generar el QR para la entrada', ...error });
  }
};

const usarEntrada = async (req, res) => {
    try {
      const { qrCode } = req.body;
  
      if (req.usuario.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso no autorizado. Se requiere un usuario administrador.' });
      }

      const entrada = await Entrada.findOne({
        where: {
          qr: qrCode,
          usada: false,
        },
      });
  
      if (!entrada) {
        return res.status(404).json({ error: 'Entrada no encontrada o ya usada' });
      }
  
      await entrada.update({ usada: true });
  
      res.status(200).json({ mensaje: 'Entrada usada con éxito' });
    } catch (error) {
      console.error('Error al usar la entrada:', error);
      res.status(500).json({ error: 'Error al usar la entrada', ...error });
    }
  };

  const getEntradas = async (req, res) => {
    try {
      const esAdmin = req.user.role === 'admin';

      const userId = esAdmin && req.query.userId ? req.query.userId : req.user.id;
  
    
      const usuario = await User.findByPk(userId);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  

      const entradas = esAdmin || req.user.id === userId ?
        await Entrada.findAll({
          where: { userId },
          include: [{
            model: Evento,
            attributes: ['nombre', 'estado'],
          }],
        }) :
        [];
  
      res.status(200).json(entradas);
    } catch (error) {
      console.error('Error al obtener entradas:', error);
      res.status(500).json({ error: 'Error al obtener entradas' });
    }
  };
  

export { generarQR, usarEntrada, getEntradas };