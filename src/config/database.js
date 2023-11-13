import { Sequelize } from "sequelize";

const db = new Sequelize('mydatabase', 'dbuser', 'dbpassword', {
    host: 'localhost',
    dialect: 'mysql',
  });

export default db;