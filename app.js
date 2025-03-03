import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './src/routes/index.js'

// 🛠️ Solución para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar carpeta de vistas estáticas
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use('/', indexRoutes);



// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
