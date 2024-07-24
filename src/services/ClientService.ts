import { UtilityService } from '../utils/utils';
import { CustomLogger } from '../utils/logger';
import { Claim, Client } from '../models/schema';
import { CustomValidator } from '../utils/validator';


class ClientService {

    private util = new UtilityService();
    private validators = new CustomValidator();

    async addClient(clientData: any): Promise<{ success: boolean; client?: any; errorMessage?: any }> {

        try {

            const { name,email,dateOfBirth,address } = clientData.body;
            
            const { error } = this.validators.clientValidationSchema.validate({
                name,
                email,
                dateOfBirth,
                address,
            });
            
            if (error) {
                return { success: false, errorMessage: error.message };
            }

            if (!this.util.isAbove18(dateOfBirth)){
                return { success: false, errorMessage: "Client should be above 18 years old" };
            }
            
            const existingClient = await Client.findOne({ email: email });
        
            if (existingClient) {
                return { success: false, errorMessage: "Client with the same email already exists" };
            }
            
            const newClient = new Client({
                name: name,
                email: email,
                dateOfBirth: dateOfBirth,
                address: address,
            });
            const savedClient =await newClient.save();
            return { success: true, client: savedClient };
        } catch (error: any) {
            return { success: false, errorMessage:error.message };
        }
    }

    async listClients(): Promise<{ success: boolean; clients?: any; errorMessage?: any }> {

        try {
            const clients = await Client.find({});
            if(!clients){
                return { success: false, errorMessage: "No clients found" };
            }
            return { success: true, clients: clients };
        } catch (error: any) {
            return { success: false, errorMessage:error.message };
        }
    }

}

export default ClientService;


