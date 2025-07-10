import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger configuration
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FundTek Capital Group API',
      version: '1.0.0',
      description: 'Enterprise-level FinTech API for business funding solutions',
      contact: {
        name: 'FundTek Capital Group',
        email: 'admin@fundtekcapitalgroup.com',
        url: 'https://fundtekcapitalgroup.com'
      },
      license: {
        name: 'Proprietary',
        url: 'https://fundtekcapitalgroup.com/terms'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.fundtekcapitalgroup.com' 
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for API authentication'
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API key for service-to-service authentication'
        }
      },
      schemas: {
        // Error schemas
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['error', 'fail']
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            code: {
              type: 'string',
              description: 'Error code for programmatic handling'
            },
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
            path: {
              type: 'string',
              description: 'API endpoint that generated the error'
            },
            requestId: {
              type: 'string',
              description: 'Unique request identifier for debugging'
            }
          },
          required: ['status', 'message', 'timestamp']
        },
        
        ValidationError: {
          allOf: [
            { $ref: '#/components/schemas/Error' },
            {
              type: 'object',
              properties: {
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        type: 'string',
                        description: 'Field that failed validation'
                      },
                      message: {
                        type: 'string',
                        description: 'Validation error message'
                      },
                      code: {
                        type: 'string',
                        description: 'Validation error code'
                      }
                    },
                    required: ['field', 'message', 'code']
                  }
                }
              }
            }
          ]
        },

        // Loan Application schemas
        LoanApplicationInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              maxLength: 100,
              description: 'Applicant first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              maxLength: 100,
              description: 'Applicant last name',
              example: 'Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Applicant email address',
              example: 'john.doe@example.com'
            },
            phone: {
              type: 'string',
              maxLength: 20,
              description: 'Applicant phone number',
              example: '+1-555-123-4567'
            },
            businessName: {
              type: 'string',
              maxLength: 255,
              description: 'Business legal name',
              example: 'Doe Enterprises LLC'
            },
            businessType: {
              type: 'string',
              maxLength: 100,
              description: 'Type of business',
              example: 'Retail'
            },
            yearsInBusiness: {
              type: 'integer',
              minimum: 0,
              maximum: 100,
              description: 'Years the business has been operating',
              example: 5
            },
            monthlyRevenue: {
              type: 'integer',
              minimum: 0,
              description: 'Monthly revenue in dollars',
              example: 50000
            },
            loanAmount: {
              type: 'integer',
              minimum: 1000,
              maximum: 5000000,
              description: 'Requested loan amount in dollars',
              example: 100000
            },
            loanPurpose: {
              type: 'string',
              description: 'Purpose of the loan',
              example: 'Equipment purchase and working capital'
            },
            creditScore: {
              type: 'integer',
              minimum: 300,
              maximum: 850,
              description: 'Personal credit score',
              example: 720
            }
          },
          required: ['firstName', 'lastName', 'email', 'businessName', 'loanAmount']
        },

        LoanApplicationResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success']
            },
            data: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'Unique loan application ID'
                },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                businessName: { type: 'string' },
                businessType: { type: 'string' },
                yearsInBusiness: { type: 'integer' },
                monthlyRevenue: { type: 'integer' },
                loanAmount: { type: 'integer' },
                loanPurpose: { type: 'string' },
                creditScore: { type: 'integer' },
                status: {
                  type: 'string',
                  enum: ['pending', 'approved', 'rejected', 'funded'],
                  description: 'Current application status'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        },

        LoanApplicationListResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success']
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/LoanApplicationResponse/properties/data'
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Current page number'
                },
                limit: {
                  type: 'integer',
                  description: 'Items per page'
                },
                total: {
                  type: 'integer',
                  description: 'Total number of items'
                },
                pages: {
                  type: 'integer',
                  description: 'Total number of pages'
                }
              }
            }
          }
        },

        // Contact Submission schemas
        ContactSubmissionInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              maxLength: 100,
              description: 'Contact first name',
              example: 'Jane'
            },
            lastName: {
              type: 'string',
              maxLength: 100,
              description: 'Contact last name',
              example: 'Smith'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Contact email address',
              example: 'jane.smith@example.com'
            },
            phone: {
              type: 'string',
              maxLength: 20,
              description: 'Contact phone number',
              example: '+1-555-987-6543'
            },
            fundingAmount: {
              type: 'string',
              maxLength: 50,
              description: 'Requested funding amount range',
              example: '$50,000 - $100,000'
            },
            message: {
              type: 'string',
              description: 'Contact message or inquiry',
              example: 'Interested in business funding options for expansion'
            }
          },
          required: ['firstName', 'lastName', 'email']
        },

        // Health check schema
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'degraded', 'unhealthy']
            },
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
            version: {
              type: 'string',
              description: 'API version'
            },
            service: {
              type: 'string',
              description: 'Service name'
            },
            uptime: {
              type: 'number',
              description: 'Service uptime in seconds'
            },
            database: {
              type: 'object',
              properties: {
                connected: { type: 'boolean' },
                latency: { type: 'number', description: 'Database latency in milliseconds' }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        apiKey: []
      }
    ]
  },
  apis: [
    './server/api/v1/routes.ts',
    './server/routes.ts'
  ]
};

// Generate swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Custom CSS for swagger UI
const customCss = `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info .title { color: #85abe4; }
  .swagger-ui .scheme-container { background: #fafafa; }
  .swagger-ui .btn.authorize { background-color: #85abe4; border-color: #85abe4; }
  .swagger-ui .btn.authorize:hover { background-color: #6b9bd8; }
`;

// Setup swagger documentation
export function setupSwagger(app: Express) {
  // Serve swagger JSON
  app.get('/api/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Serve swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss,
    customSiteTitle: 'FundTek Capital Group API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true
    }
  }));

  console.log('📚 API Documentation available at /api/docs');
  console.log('📄 OpenAPI spec available at /api/docs/swagger.json');
}

// Export swagger spec for testing
export { swaggerSpec };