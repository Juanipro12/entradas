import Evento from '../models/evento.js';

const crearEvento = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    if (req.usuario.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso no autorizado. Se requiere un usuario administrador.' });
      }

    const nuevoEvento = await Evento.create({ nombre, estado });

    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

const getEventos = async (req, res) => {
    try {
      const eventos = await Evento.findAll();
      res.status(200).json(eventos);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      res.status(500).json({ error: 'Error al obtener eventos' });
    }
  };
  

export { crearEvento, getEventos };