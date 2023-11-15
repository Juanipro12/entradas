import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';

const Entrada = db.define('Entrada', {
  qr: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  usada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Entrada;