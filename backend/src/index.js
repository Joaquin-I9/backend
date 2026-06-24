import express from 'express';
import cors from 'cors';
import repuestosRoutes from './routes/repuestos.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
// ...


const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Vinculamos las rutas ordenadas
app.use(usersRoutes);
app.use(authRoutes);
app.use(repuestosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});