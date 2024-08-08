import { Request, Response } from "express";
import PolicyService from "../services/OrderService";
import OrderService from "../services/OrderService";

export class OrderController {
  async createPolicy(req: Request, resp: Response) {
    try {
      const orderSrv = new OrderService();

      const result = await orderSrv.createOrder(req);

      if (result.success) {
        resp
          .status(201)
          .json({
            message: "Order created successfully",
            policy: result.order,
          });
      } else {
        resp.status(400).json({ error: result.errorMessage });
      }
    } catch (error) {
      resp.status(500).json({ error: error });
    }
  }
}
