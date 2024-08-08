import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './documentation/swagger';

import { MongoConnector } from './database/mongoConnector';
import { CustomLogger } from './utils/logger';
import { ProductController } from './controller/ProductController';
import { OrderController } from './controller/OrderController';

const mongoConnector = new MongoConnector();
const productController = new ProductController();
const orderController = new OrderController();

const logger = new CustomLogger();

export const app: Application = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.post('/api/product', productController.createProduct);
app.get('/api/product', productController.listProucts);
app.get('/api/product/:productId', productController.findProductById);
app.put('/api/product/:productId', productController.updateProduct);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Function to log and return all registered routes
function logRoutes(app: Application) {
    const routes: string[] = [];
    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            // Routes registered directly on the app
            const methods = Object.keys(middleware.route.methods).map((method) => method.toUpperCase());
            routes.push(`${methods.join(', ')} ${middleware.route.path}`);
            console.log(`${methods.join(', ')} ${middleware.route.path}`);
        } else if (middleware.name === 'router') {
            // Routes registered on a router
            middleware.handle.stack.forEach((handler: any) => {
                const route = handler.route;
                const methods = Object.keys(route.methods).map((method) => method.toUpperCase());
                routes.push(`${methods.join(', ')} ${route.path}`);
                console.log(`${methods.join(', ')} ${route.path}`);
            });
        }
    });
    return routes;
}

// Routes
app.get('/', (req: Request, res: Response) => {
    const baseUrl = `http://localhost:${PORT}`; // Define the base URL

    // Log a message
    console.log("This is a test log message");

    // Get all registered routes and include the base URL
    const routes = logRoutes(app).map(route => {
        const [method, path] = route.split(' ');
        return `${baseUrl}${path} <span style="font-weight: bold; color: #00ff00;">[${method}]</span>`;
    });

    // HTML content with updated styles
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #000; /* Background color set to black */
                    color: #fff; /* Text color set to white */
                    text-align: center;
                    padding: 20px;
                }
                h1 {
                    color: #ffcc00; /* Header text color set to yellow */
                }
                .footer {
                    font-size: 12px;
                    margin-top: 20px;
                }
                .log-messages {
                    margin-top: 20px;
                    color: #00ff00; /* Text color set to green */
                    text-align: center; /* Centering the text */
                    font-size: 16px;
                }
                .log-messages ul {
                    list-style-type: disc; /* Bullet points */
                    padding: 0;
                    margin: 0 auto; /* Center the entire list */
                    display: inline-block; /* To center the bullets */
                    text-align: left; /* Align the text within bullets to left */
                    background-color: #222; /* Dark background for block effect */
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
                }
                .log-messages li {
                    margin: 10px 0;
                    font-size: 16px;
                }
                .method {
                    font-weight: bold;
                    color: #00ff00; /* Green color for method */
                    margin-left: 10px; /* Spacing between URL and method */
                }
            </style>
        </head>
        <body>
            <h1>Welcome to the Ecommerce API For Our Microservice</h1>
            <p>This is a simple Microservice showcasing the skills for building distributed systems in an environment for Insurance.</p>
            <div class="log-messages">
                <h2>Available API Endpoints</h2>
                <ul>
                    ${routes.map(route => `<li>${route}</li>`).join('')}
                </ul>
            </div>
            <div class="footer">Developed by: Joseph Kithome, Software Engineer at DDS </div>
        </body>
        </html>
    `;
    
    // Send the HTML content as the response
    res.send(htmlContent);
});


// Server start
const PORT = process.env.PORT || 8001;

function runServer() {
    try {
        mongoConnector.connect();
        app.listen(PORT, () => {
            logger.logInfo(`Server started on port http://localhost:${PORT} ${new Date().toISOString()}`);
            logRoutes(app); // Log routes to console
        });
    } catch (e) {
        console.error(e);
    }
}

runServer();
