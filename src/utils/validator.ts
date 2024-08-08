import Joi from "joi";

export class CustomValidator {
  productValidator = Joi.object({
    name: Joi.string().required(),   
    price: Joi.number().required(),
    description: Joi.string().required(), 
    stock: Joi.number().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    imageUrl: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
});

  productUpdateValidator = Joi.object({
    name: Joi.string().required(),   
    price: Joi.number().required(),
    description: Joi.string().required(), 
    stock: Joi.number().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    imageUrl: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso(),
  }).custom((value, helpers) => {
    const { createdAt, updatedAt } = value;
    if (new Date(updatedAt) <= new Date(createdAt)) {
      return helpers.message({
        custom: `updatedAt ${updatedAt} must be after createdAt`,
      });
    }
    return value;
  }, "updatedAt Validation");
  orderValidator = Joi.object({
    orderId: Joi.string().required(),
    user: Joi.string().required(),
    products: Joi.number().required(),
    totalAmount: Joi.string().required(),    
    shippingAddress: Joi.string(),
    status: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  }).custom((value, helpers) => {
    const { createdAt, updatedAt } = value;
    if (new Date(updatedAt) <= new Date(createdAt)) {
      return helpers.message({
        custom: `updatedAt ${updatedAt} must be after createdAt`,
      });
    }
    return value;
  }, "updatedAt Validation");

  reviewProduct = Joi.object({
    productId: Joi.string().required(),
    user: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  });

  cartValidation = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().required().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    })),
    totalAmount: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  });

  paymentValidator = Joi.object({
    userId: Joi.string().required(),
    orderId: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    amount: Joi.number().required(),
    transactionId: Joi.string().required(),
    status: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  });

}