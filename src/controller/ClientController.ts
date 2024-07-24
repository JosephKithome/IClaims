import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

export class ClientController {
    async createClient(req: Request, resp: Response) {
        try {
           

            const clientService = new ClientService();

            const result = await clientService.addClient(req);

            if (result.success) {
                resp.status(201).json({ message: 'Client created successfully', client: result.client });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }

    async listClients(req: Request, resp: Response) {
        try {
           

            const clientService = new ClientService();


            const result = await clientService.listClients();

            if (result.success) {
                resp.status(201).json({ message: `Success`, policy: result.clients });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
}