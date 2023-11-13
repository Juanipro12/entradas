// sequelize-config.js

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'dbuser',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'mydatabase',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  test: {
    // ... (configuración para entorno de prueba si es necesario)
  },
  production: {
    // ... (configuración para entorno de producción si es necesario)
  },
};
