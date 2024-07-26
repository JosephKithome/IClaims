import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './documentation/swagger';

import { MongoConnector } from './database/mongoConnector';
import { CustomLogger } from './utils/logger';
import { ClientController } from './controller/ClientController';
import { PolicyController } from './controller/PolicyController';
import { ClaimController } from './controller/ClaimController';


const  mongoConnector = new MongoConnector();
const clientController = new ClientController();
const policyController = new PolicyController();
const claimController = new ClaimController();

const  logger = new CustomLogger();


export const app: Application = express();

// Middleware
app.use(bodyParser.json());


app.post('/api/v1/clients', clientController.createClient); 
app.get('/api/v1/clients', clientController.listClients);
app.get('/api/v1/clients/:clientId', clientController.clientById);

app.post('/api/v1/policy', policyController.createPolicy);

app.post('/api/v1/claims', claimController.submitClaim);
app.put('/api/v1/claims/:claimId', claimController.processClaim);
app.get('/api/v1/claims/:clientId', claimController.listClientClaims);
app.get('/api/v1/claims/total-by-policy-type/:policyId', claimController.totalClaimsByPolicyType);
app.get('/api/v1/claims/total-premium-by-client/:clientId', claimController.totalPremiumByClient);


// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server start
const PORT = process.env.PORT || 3001;

function runServer() {
    try {
        mongoConnector.connect();
        app.listen(PORT, () => {
            logger.logInfo(`Server started on port http://localhost:${PORT} ${new Date().toISOString()}`);
        });
    } catch (e) {
        console.error(e);
    }
}

runServer();
