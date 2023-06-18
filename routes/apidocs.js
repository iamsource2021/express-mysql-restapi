const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definición de opciones para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Una API de ejemplo con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['routes/*.js'], // Rutas donde se encuentran los comentarios de Swagger
};

// Generar el objeto Swagger con las opciones
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Ruta para mostrar la interfaz Swagger UI
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocs));

module.exports = router;
