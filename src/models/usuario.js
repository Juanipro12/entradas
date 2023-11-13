// models/Usuario.js
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Usuario = db.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'normal'),
    defaultValue: 'normal',
  },
});

export default Usuario;
