export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
      title: 'IClaims API Documentation',
      version: '1.0.0',
      description: 'API documentation for Insurance claims.',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Adjust this URL according to your API's base URL
        description: 'Local server',
      },
    ],

    components: {},
    security: [],
    tags: [
      { 
        name: 'Clients', 
        description: 'Operations related to clients' 
      },
    ],
    paths: {
      '/api/v1/clients': {
        post: {
          tags: ['Clients'],
          summary: 'Create a new client',
          operationId: 'createClient',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    address: { type: 'string' },
                    dateOfBirth: { type: 'string', format: 'date' },
                  },
                  required: ['name', 'email', 'address', 'dateOfBirth'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Client created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      clientId: { type: 'string' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      error: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        // Get all clients
        get: {
          tags: ['Clients'],
          summary: 'Get all clients',
          operationId: 'getClients',
          responses: {
            '200': {
              description: 'A list of clients',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        address: { type: 'string' },
                        dateOfBirth: { type: 'string', format: 'date' },
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      error: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/clients/{id}': {
        get: {
          tags: ['Clients'],
          summary: 'Get a client by ID',
          operationId: 'getClientById',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the client to retrieve',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Client retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                      address: { type: 'string' },
                      dateOfBirth: { type: 'string', format: 'date' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Client not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      error: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    
  };
  