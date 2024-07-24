import Joi from "joi";

export class CustomValidator {
  clientValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required(),
    address: Joi.string().required(),
  });

  policyCValidator = Joi.object({
    clientId: Joi.string().required(),
    policyNumber: Joi.number().required(),
    policyType: Joi.string().required(),    
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    premiumAmount: Joi.number().required(),
    coverageAmount: Joi.number().required(),
    status: Joi.string(),
  }).custom((value, helpers) => {
    const { startDate, endDate } = value;
    if (new Date(endDate) <= new Date(startDate)) {
      return helpers.message({
        custom: `endDate ${endDate} must be after startDate`,
      });
    }
    return value;
  }, "End Date Validation");

  claimCValidator = Joi.object({
    policyId: Joi.string().required(),
    clientId: Joi.string().required(),    
    claimDate: Joi.date().iso().required(),
    startDate: Joi.date().iso().required(),
    claimAmount: Joi.number().required(),
    description: Joi.string(),
    status: Joi.string(),
  }).custom((value, helpers) => {
    const { startDate, endDate } = value;
    if (new Date(endDate) <= new Date(startDate)) {
      return helpers.message({
        custom: `startDate ${startDate} must be after claimDate`,
      });
    }
    return value;
  }, "End Date Validation");

  claimUpdate = Joi.object({
    claimId: Joi.string().required(),
    status: Joi.string(),
  })
}