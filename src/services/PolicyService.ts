import { UtilityService } from "../utils/utils";
import { Client, Policy } from "../models/schema";
import { CustomValidator } from "../utils/validator";
import { v4 as uuidv4 } from 'uuid';

class PolicyService {

  private util = new UtilityService();
  private validators = new CustomValidator();

  async createPolicy(policyData: any): Promise<{ success: boolean; policy?: any; errorMessage?: any }> {
    try {
      const {
        clientId,
        policyType,
        startDate,
        endDate,
        premiumAmount,
        coverageAmount,
        status,
      } = policyData.body;

      const policyNumber = this.util.policyNumberGenerator()

      const { error } = this.validators.policyCValidator.validate({
        clientId,
        policyNumber,
        policyType,
        startDate,
        endDate,
        premiumAmount,
        coverageAmount,
        status,
      });

      if (error) {
        return { success: false, errorMessage: error.message };
      }

      if (!this.util.isAllowedPolicyStatus(status)) {
        return { success: false, errorMessage: "Invalid policy status" };
      }
      if(!this.util.isAllowedPolicyType(policyType)){
        return { success: false, errorMessage:"Invalid policy type" };
      }
      const client = await Client.findOne({ clientId });
      if (!client) {
        return { success: false, errorMessage: "Client not found" };
      }
      
      const existingPolicyByClient = await Client.findOne({ clientId });
      // if (existingPolicyByClient) {
      //   return { success: false, errorMessage: "Policy number already exists for this client" };
      // }

      const policy = new Policy({
        policyId: uuidv4(),
        client,
        policyNumber,
        policyType,
        startDate,
        endDate,
        premiumAmount,
        coverageAmount,
        status,
      });
      const savedPolicy = await policy.save();

      return { success: true, policy: savedPolicy };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
}

export default PolicyService;
