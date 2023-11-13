// src/models/evento.js
import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';

const Evento = db.define('Evento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('terminado', 'en curso', 'suspendido'),
    allowNull: false,
  },
});

export default Evento;
