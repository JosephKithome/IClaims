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
    { 
      name: 'Policy', 
      description: 'Operations related to policies' 
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
    '/api/v1/policy': {
      post: {
        tags: ['Policy'],
        summary: 'Create a new policy',
        operationId: 'createPolicy',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  policyId: { type: 'string' },
                  clientId: { type: 'string' },
                  policyNumber: { type: 'string' },
                  policyType: { type: 'string' },
                  premiumAmount: { type: 'string' },
                  coverageAmount: { type: 'string' },
                  startDate: { type: 'string', format: 'date' },
                  endDate: { type: 'string', format: 'date' },
                  status: { type: 'string' }
                },
                required: ['clientId', 'policyNumber', 'policyType', 'premiumAmount', 'coverageAmount', 'startDate', 'endDate', 'status'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Policy created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    policyId: { type: 'string' },
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
      get: {
        tags: ['Policy'],
        summary: 'Get all policies',
        operationId: 'getPolicies',
        responses: {
          '200': {
            description: 'A list of policies',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      policyId: { type: 'string' },
                      clientId: { type: 'string' },
                      policyNumber: { type: 'string' },
                      policyType: { type: 'string' },
                      premiumAmount: { type: 'string' },
                      coverageAmount: { type: 'string' },
                      startDate: { type: 'string', format: 'date' },
                      endDate: { type: 'string', format: 'date' },
                      status: { type: 'string' }
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
    '/api/v1/policy/{policyId}': {
      get: {
        tags: ['Policy'],
        summary: 'Get a policy by ID',
        operationId: 'policyId',
        parameters: [
          {
            name: 'policyId',
            in: 'path',
            required: true,
            description: 'ID of the policy to retrieve',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Policy retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    policyId: { type: 'string' },
                    clientId: { type: 'string' },
                    policyNumber: { type: 'string' },
                    policyType: { type: 'string' },
                    premiumAmount: { type: 'string' },
                    coverageAmount: { type: 'string' },
                    startDate: { type: 'string', format: 'date' },
                    endDate: { type: 'string', format: 'date' },
                    status: { type: 'string' }
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
    '/api/v1/claims': {
      post: {
        tags: ['Claims'],
        summary: 'Create a new policy',
        operationId: 'createPolicy',
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
            description: 'Policy created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    policyId: { type: 'string' },
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
      get: {
        tags: ['Policy'],
        summary: 'Get all policies',
        operationId: 'getPolicies',
        responses: {
          '200': {
            description: 'A list of policies',
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
  },
};
