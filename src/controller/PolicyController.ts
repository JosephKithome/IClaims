import { Request, Response } from 'express';
import PolicyService from '../services/PolicyService';

export class PolicyController {
    async createPolicy(req: Request, resp: Response) {
        try {
           

            const policyService = new PolicyService();

            const result = await policyService.createPolicy(req);

            if (result.success) {
                resp.status(201).json({ message: 'Policy created successfully', policy: result.policy });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
}