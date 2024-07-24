import mongoose from "mongoose";
import { Claim, Client, Policy } from "../models/schema";
import { ClaimStatus } from "../models/Status";
import { UtilityService } from "../utils/utils";
import { CustomValidator } from "../utils/validator";
import { v4 as uuidv4 } from 'uuid';

class ClaimService {
  private util = new UtilityService();
  private validators = new CustomValidator();

  async submitClaim(
    claimData: any
  ): Promise<{ success: boolean; claim?: any; errorMessage?: any }> {
    try {
      const {
        policyId,
        clientId,
        claimDate,
        startDate,
        claimAmount,
        description,
        status,
      } = claimData.body;

      const { error } = this.validators.claimCValidator.validate({
        policyId,
        clientId,
        claimDate,
        startDate,
        claimAmount,
        description,
        status,
      });

      if (error) {
        return { success: false, errorMessage: error.message };
      }

      const policy = await Policy.findOne({ policyId });
      if (!policy) {
        return { success: false, errorMessage: 'Policy not found' };
      }

      if (policy.coverageAmount < claimAmount) {
        return { success: false, errorMessage: 'Claim amount exceeds coverage amount' };
      }

      const client = await Client.findOne({ clientId });
      if (!client) {
        return { success: false, errorMessage: 'Client not found' };
      }

      const newClaim = new Claim({
        claimId: uuidv4(),
        policyId: policy,
        clientId: client,
        claimDate,
        startDate,
        claimAmount,
        description,
        status: ClaimStatus.SUBMITTED,
      });

      const savedClaim = await newClaim.save();
      return { success: true, claim: savedClaim };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
  async processClaim(
    claimData: any
  ): Promise<{ success: boolean; claim?: any; errorMessage?: any }> {
    try {

      const { claimId } = claimData.params; 

      const {
        status,
      } = claimData.body;

      const { error } = this.validators.claimUpdate.validate({
        claimId,
        status,
      });

      if (error) {
        return { success: false, errorMessage: error.message };
      }
      
      const claim = await Claim.findOne({claimId: claimId});
      console.log(claim)

      if(!claim) {
        return { success: false, errorMessage: 'Claim not found' };
      }
      
      const policy = await Policy.findOne({_id: claim.policyId});
      if(!policy) {
        return { success: false, errorMessage: 'Policy not found' };
      }
      if(policy.status !=='active'){
        return {success: false, errorMessage: "You can only update active policies"};
      }
      if(this.util.isAllowedClaimStatus(status)) {
        return { success: false, errorMessage: 'Invalid claim status' };
      }
      if(claim.status ==status){
        return { success: false, errorMessage: "Claim is already in the requested status"};
      }

      // Disbursement Amount=Claim Amount×Coverage Percentage
      const coveragePercentage: any = (parseInt(policy.coverageAmount) / parseInt(policy.premiumAmount)) * 100;
      console.log("coveragePercentage", coveragePercentage);

      const disbursementAmount = claim.claimAmount * coveragePercentage;
      console.log("disbursementAmount", disbursementAmount);

      claim.status = status;
      const savedClaim = await claim.save();
      const data = {
        ...savedClaim,
        disbursementAmount,
        coveragePercentage,
      }
      return { success: true, claim: data };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
  async listClientClaims(
    cliedId: any
  ): Promise<{ success: boolean; claims?: any; errorMessage?: any }> {
    try {

      const { clientId } = cliedId.params; 
      console.log

      const client = await Client.findOne({_id: clientId });
      if (!client) {
        return { success: false, errorMessage: 'Client not found' };
      }
      
      const claims = await Claim.find({ clientId });
      if(!claims){
        return { success: false, errorMessage: 'No claims found for this client' };
      }
      return { success: true, claims: claims };
     
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }

  async totalClaimsByPolicyType(
    req: any
  ): Promise<{ success: boolean; claims?: any; errorMessage?: any }> {
    try {
      const { policyId } = req.params;
      const claims = await Claim.find({ policyId: policyId });
      
      if (!claims || claims.length === 0) {
        return { success: false, errorMessage: 'No claims found for this policy type' };
      }
  
      // Get the count of claims
      const totalClaims = claims.length;
      
      // Calculate the total amount of claims
      const totalAmount = claims.reduce((acc, curr) => acc + (curr.claimAmount || 0), 0);
  
      const data = {
        totalClaims: totalClaims,
        totalAmount: totalAmount,
      };
  
      return { success: true, claims: data };
  
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
  
  async totalPremiumByClient(
    req: any
  ): Promise<{ success: boolean; totalPremium?: number; errorMessage?: string }> {
    try {
      const { clientId } = req.params;
  
      const result = await Claim.aggregate([
        { $match: { clientId: new mongoose.Types.ObjectId(clientId) } },
        { $group: { _id: '$clientId', totalPremium: { $sum: '$claimAmount' } } }
      ]);
  
      if (result.length === 0) {
        return { success: false, errorMessage: 'No claims found for this client' };
      }
  
      const totalPremium = result[0].totalPremium;
  
      return { success: true, totalPremium: totalPremium };
  
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
  

}

export default ClaimService;
