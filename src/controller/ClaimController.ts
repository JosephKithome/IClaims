import { Request, Response } from 'express';
import ClaimService from '../services/ClaimService';

export class ClaimController {
    async submitClaim(req: Request, resp: Response) {
        try {
           

            const claimService = new ClaimService();

            const result = await claimService.submitClaim(req);

            if (result.success) {
                resp.status(201).json({ message: 'Claim raised successfully', policy: result.claim });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }

    async processClaim(req: Request, resp: Response) {
        try {
           

            const claimService = new ClaimService();

            const result = await claimService.processClaim(req);

            if (result.success) {
                resp.status(201).json({ message: `Claim processed successfully to ${req.body.status} `, policy: result.claim });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
    async listClientClaims(req: Request, resp: Response) {
        try {
           

            const claimService = new ClaimService();

            const result = await claimService.listClientClaims(req);

            if (result.success) {
                resp.status(201).json({ message: `Success`, policy: result.claims });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
    async totalClaimsByPolicyType(req: Request, resp: Response) {
        try {
           

            const claimService = new ClaimService();

            const result = await claimService.totalClaimsByPolicyType(req);

            if (result.success) {
                resp.status(201).json({ message: `Success`, policy: result.claims });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
    async totalPremiumByClient(req: Request, resp: Response) {
        try {
           

            const claimService = new ClaimService();

            const result = await claimService.totalPremiumByClient(req);

            if (result.success) {
                resp.status(201).json({ message: `Success`, policy: result.totalPremium });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
}