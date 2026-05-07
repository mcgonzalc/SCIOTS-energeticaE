import cors from 'cors';
import express from "express";
import http from 'http';
import setupSwagger from './config/swagger-config.js'
import apiRoutes from './routes/energeticaRoutes.js';
import connectDatabase from './config/db.js';

const app = express();
const PORT = 4000;

const server = http.createServer(app);

setupSwagger(app);
app.use(express.json());

//Configuración del CORS
const corsOptions = {
  origin: '*' ,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); 
  next();
});


//Rutas
app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.send('API en marcha, la documentación se encuentra en /api-docs.');
});


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
});

async function startServer() {
  try {

    await connectDatabase();

    server.listen(PORT, () => {
      console.log(` Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(` Documentación disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(' Error al iniciar el servidor:', error);
    process.exit(1);
  }
}
  
startServer();