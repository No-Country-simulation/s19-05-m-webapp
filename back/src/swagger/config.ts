import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Checkpoint Zone API',
      description: 'API de Checkpoint Zone - E-commerce',
      version: '1.0'
    },
  },
  apis: ['./src/routers/*.ts', './src/controllers/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};