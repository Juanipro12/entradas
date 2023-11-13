import express from 'express';
import Entrada from './models/entrada.js';
import Evento from './models/evento.js';
import db from './config/database.js';
import eventoRoutes from './routes/eventoRoutes.js';
import entradaRoutes from './routes/entradaRoutes.js';
import Usuario from './models/usuario.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', eventoRoutes);
app.use('/api', entradaRoutes);
app.use('/api', userRoutes);

Usuario.hasMany(Entrada, { foreignKey: 'usuarioId', as: 'entradas' });
Entrada.belongsTo(Evento); 
Evento.hasMany(Entrada);  


db.sync({ force: true }).then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
})();



app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
