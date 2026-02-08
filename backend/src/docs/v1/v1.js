const swaggerV1 = {
  openapi: '3.0.0',
  info: {
    title: 'Tienda API',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1 (relative)',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
  },
};

export default swaggerV1;
