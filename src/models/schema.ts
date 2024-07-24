import mongoose, { Schema, Document } from 'mongoose';
import {PolicyType, PolicyStatus,ClaimStatus} from './Status';

/*****************************************Start Client schema***************************************************************************** */

export interface ClientDocument extends Document {
    clientId: string;
    name: string;
    email: string;
    dateOfBirth: string; 
    address: string;
}

const clientSchema: Schema = new Schema({
    clientId: { type: String, required: true },
    name: { type: String, required: true},
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: false },
    address: { type: String, required: true },

});

export const Client = mongoose.model<ClientDocument>('Client', clientSchema);

/*****************************************End Client schema***************************************************************************** */
/*****************************************Define Policy schema***************************************************************************** */

export interface PolicyDocument extends Document {
    policyId: string;
    clientId: string;
    policyNumber: string;
    policyType: string;
    startDate: string; 
    endDate: string;
    premiumAmount: string;
    coverageAmount: string;
    status: string;
}

const policySchema: Schema = new Schema({
    policyId: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: false},
    policyNumber: { type: String, required: true },
    policyType:  {
        type: String,
        enum: PolicyType,
        required: true
      },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    premiumAmount: { type: String, required: true },
    coverageAmount: { type: String, required: true },

    status: {
        type: String,
        enum: PolicyStatus,
        required: true
      }


});

export const Policy = mongoose.model<PolicyDocument>('Policy', policySchema);

/*****************************************End Policy schema***************************************************************************** */
/*****************************************Define Claim schema***************************************************************************** */

export interface ClaimDocument extends Document {
    claimId: string;
    policyId: string;
    clientId: string;
    claimDate: Date;
    startDate: string; 
    claimAmount: number;
    description: string;
    status: string;
}

const claimSchema: Schema = new Schema({
    claimId: { type: String, required: true },
    policyId: { type: Schema.Types.ObjectId, ref: 'Policy', required: true},
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true},
    claimDate: { type: Date, required: true },
    startDate: { type: String, required: true },
    claimAmount: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ClaimStatus,
        required: true
      }


});

export const Claim = mongoose.model<ClaimDocument>('Claim', claimSchema);

/*****************************************End Claim schema***************************************************************************** */