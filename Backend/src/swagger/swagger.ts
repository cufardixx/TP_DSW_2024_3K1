import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EventLife API',
            version: '1.0.0',
            description: 'API for EventLife',
            contact: {
                name: 'Picia Facundo'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                },
                {
                    url: 'https://backend-eventlife.onrender.com',
                    description: 'Production server'    
                }
            ]
        }
    },
    apis: ['./src/routes/*.ts']
};

const specs = swaggerJsdoc(options);
export default specs;