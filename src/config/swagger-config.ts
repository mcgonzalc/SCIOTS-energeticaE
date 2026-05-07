import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'API de la energética E', // Título general de la API
      version: '1.0.0',
      description: 'Conjunto de enlaces de la energética E', // Descripción de la API
    },

    tags: [ //Definimos las categorias para cada una de las rutas
      {
        name: 'Energética',
        description: "Rutas relacionades con la gestión de la empresa energética",
      },
    ],

    servers: [
      {
        url: `http://localhost:4000`,
        description: 'Servidor local para el desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Especifica las rutas que Swagger debe leer para la documentación
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Función para configurar Swagger en el servidor
const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;