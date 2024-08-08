import { Order } from "../models/schema";
import { UtilityService } from "../utils/utils";
import { CustomValidator } from "../utils/validator";
import { v4 as uuidv4 } from 'uuid';

class OrderService {

  private util = new UtilityService();
  private validators = new CustomValidator();

  async createOrder(orderRequest: any): Promise<{ success: boolean; order?: any; errorMessage?: any }> {
    try {
      const { products,
        totalAmount,
        status,
        shippingAddress,
        paymentStatus,
        createdAt,
        } = orderRequest.body;
     
      const orderId = this.util.orderNamingSeries();

      const { error } = this.validators.orderValidator.validate({
        orderId,
        products,
        totalAmount,
        status,
        shippingAddress,
        paymentStatus,
        createdAt,
      });
      
      if (error) {
        return { success: false, errorMessage: error.message };
      }
      
      const savedOrder = await Order.create({
        orderId,
        products,
        totalAmount,
        status,
        shippingAddress,
        paymentStatus,
        createdAt,
      });

      // save the order items 
      for (const product of products) {
        const { productId, quantity } = product;
       const data = await Order.updateOne({ orderId }, { $push: { orderItems: { productId, quantity } } });
       console.log(data);

      }
      
      return { success: true, order: savedOrder };
    
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
}


export default OrderService;
