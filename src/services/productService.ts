import mongoose from "mongoose";
import { UtilityService } from "../utils/utils";
import { CustomValidator } from "../utils/validator";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../models/schema";
import jwt from "jsonwebtoken";

class ProductService {
  private util = new UtilityService();
  private validators = new CustomValidator();

  async createProduct(
    req: any
  ): Promise<{ success: boolean; product?: any; errorMessage?: any }> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      // Check if the authorization header is missing
      if (!token || token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if the token is null
      if (token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      let payload: any;

      try {
        // Verify the token
        payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
      } catch (error) {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if payload is valid
      if (!payload || typeof payload === "string") {
        return { success: false, errorMessage: "Unauthorized" };
      }
      // Check if the token has expired
      if (
        payload.expiresAt &&
        payload.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        return { success: false, errorMessage: "Token has expired" };
      }
      // Extract userId from payload
      const userId = payload.subject;
      const {
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        status,
        createdAt,
        updatedAt,
      } = req.body;

      const { error } = this.validators.productValidator.validate({
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        status,
        createdAt,
      });
      if (error) {
        return { success: false, errorMessage: error.message };
      }

      const newProduct = new Product({
        productId: uuidv4(),
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        status,
        createdAt,
        updatedAt,
      });

      const productExists = await Product.findOne({ name });
      if (productExists) {
        return { success: false, errorMessage: "Product already exists" };
      }

      const savedProduct = await newProduct.save();

      return { success: true, product: savedProduct };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }

  async findProductById(
    req: any
  ): Promise<{ success: boolean; product?: any; errorMessage?: any }> {
    try {
      
      const { productId } = req.params;
      const token = req.headers.authorization?.split(" ")[1];
      // Check if the authorization header is missing
      if (!token || token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if the token is null
      if (token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      let payload: any;

      try {
        // Verify the token
        payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
      } catch (error) {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if payload is valid
      if (!payload || typeof payload === "string") {
        return { success: false, errorMessage: "Unauthorized" };
      }
      // Check if the token has expired
      if (
        payload.expiresAt &&
        payload.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        return { success: false, errorMessage: "Token has expired" };
      }
      // Extract userId from payload
      const userId = payload.subject;

      const producEntity = await Product.find({productId: productId});
      if (!producEntity) {
        return {
          success: false,
          errorMessage: "No product found with this id",
        };
      }

      return { success: true, product: producEntity };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }

  async listProducts(
    req: any
  ): Promise<{ success: boolean; productList?: any; errorMessage?: any }> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      // Check if the authorization header is missing
      if (!token || token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if the token is null
      if (token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      let payload: any;

      try {
        // Verify the token
        payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
      } catch (error) {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if payload is valid
      if (!payload || typeof payload === "string") {
        return { success: false, errorMessage: "Unauthorized" };
      }
      // Check if the token has expired
      if (
        payload.expiresAt &&
        payload.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        return { success: false, errorMessage: "Token has expired" };
      }
      // Extract userId from payload
      const userId = payload.subject;

      const products = await Product.find();
      return { success: true, productList: products };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
  async updateProduct(
    req: any
  ): Promise<{ success: boolean; product?: any; errorMessage?: any }> {
    try {
      const { productId } = req.params;
      const token = req.headers.authorization?.split(" ")[1];
      // Check if the authorization header is missing
      if (!token || token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if the token is null
      if (token === "null") {
        return { success: false, errorMessage: "Unauthorized" };
      }

      let payload: any;

      try {
        // Verify the token
        payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
      } catch (error) {
        return { success: false, errorMessage: "Unauthorized" };
      }

      // Check if payload is valid
      if (!payload || typeof payload === "string") {
        return { success: false, errorMessage: "Unauthorized" };
      }
      // Check if the token has expired
      if (
        payload.expiresAt &&
        payload.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        return { success: false, errorMessage: "Token has expired" };
      }
      // Extract userId from payload
      const userId = payload.subject;

      const {
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        status,
        createdAt,
        updatedAt,
      } = req.body;

      const { error } = this.validators.productUpdateValidator.validate({
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        status,
        createdAt,
        updatedAt,
      });
      if (error) {
        return { success: false, errorMessage: error.message };
      }

      const existingProduct = await Product.findOne({productId: productId});
      if (!existingProduct) {
        return {
          success: false,
          errorMessage: `No product found with this ${productId}`,
        };
      }
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.stock = stock;
      existingProduct.category = category;
      existingProduct.imageUrl = imageUrl;
      existingProduct.status = status;
      existingProduct.updatedAt = updatedAt;

      const updatedProduct = await existingProduct.save();

      return { success: true, product: updatedProduct };
    } catch (error: any) {
      return { success: false, errorMessage: error.message };
    }
  }
}

export default ProductService;
