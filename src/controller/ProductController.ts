import { Request, Response } from 'express';
import ClaimService from '../services/productService';
import ProductService from '../services/productService';

export class ProductController {
    async createProduct(req: Request, resp: Response) {
        try {
            const version = req.query.version;
            const productSrv = new ProductService();
            let result;

            if (version === 'v1') {
                result = await productSrv.createProduct(req);
            } else if (version === 'v2') {
                result = await productSrv.createProduct(req);
            } else {
                return resp.status(400).json({ error: 'Invalid version' });
            }

            if (result.success) {
                resp.status(201).json({ message: 'Product created successfully', product: result.product });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error: error });
        }

    }

    async listProucts(req: Request, resp: Response) {
        try {
            const version = req.query.version;
            const productSrv = new ProductService();
            let result;
            if (version === 'v1') {
                result = await productSrv.listProducts(req);
            } else if (version === 'v2') {
                result = await productSrv.listProducts(req);
            } else {
                return resp.status(400).json({ error: 'Invalid version' });
            }

            if (result.success) {
                resp.status(201).json({ message: `Sucess`, products: result.productList });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
    async findProductById(req: Request, resp: Response) {
        try {
            const version = req.query.version;
            const productSrv = new ProductService();
            let result;
            if (version === 'v1') {
                result = await productSrv.findProductById(req);
            } else if (version === 'v2') {
                result = await productSrv.findProductById(req);
            } else {
                return resp.status(400).json({ error: 'Invalid version' });
            }

            if (result.success) {
                resp.status(201).json({ message: `Success`, product: result.product });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
    async updateProduct(req: Request, resp: Response) {
        try {
           

            const version = req.query.version;
            const productSrv = new ProductService();
            let result;
            if (version === 'v1') {
                result = await productSrv.updateProduct(req);
            } else if (version === 'v2') {
                result = await productSrv.updateProduct(req);
            } else {
                return resp.status(400).json({ error: 'Invalid version' });
            }

            if (result.success) {
                resp.status(201).json({ message: `Success`, policy: result.product });
            } else {
                resp.status(400).json({ error: result.errorMessage });
            }
        } catch (error) {
            resp.status(500).json({ error:error });
        }

    }
 
}