import mongoose, { Schema, Document } from 'mongoose';
/*****************************************Start Product schema***************************************************************************** */
export interface ProductDocument extends Document {
    productId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema = new Schema({
    productId: { type : 'string', required: true},
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<ProductDocument>('Product', productSchema);

/*****************************************End Product schema***************************************************************************** */
/*****************************************Start Order schema***************************************************************************** */

export interface OrderDocument extends Document {
    orderId: string;
    user: mongoose.Schema.Types.ObjectId;
    products: { product: mongoose.Schema.Types.ObjectId, quantity: number }[];
    totalAmount: number;
    status: string;
    shippingAddress: string;
    paymentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    
}

const orderSchema: Schema = new Schema({
    orderId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: 'unpaid' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<OrderDocument>('Order', orderSchema);

/*****************************************End Order schema***************************************************************************** */
/*****************************************Start Review schema***************************************************************************** */
export interface ReviewDocument extends Document {
    user: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);

/*****************************************End Review schema***************************************************************************** */

/*****************************************Start Cart schema***************************************************************************** */
export interface CartDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: { product: mongoose.Schema.Types.ObjectId, quantity: number }[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const cartSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema);

/*****************************************End Cart schema***************************************************************************** */
/*****************************************Start Payment schema***************************************************************************** */
export interface PaymentDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    order: mongoose.Schema.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model<PaymentDocument>('Payment', paymentSchema);

/*****************************************End Payment schema***************************************************************************** */
/*****************************************Start Wishlist schema***************************************************************************** */

export interface WishlistDocument extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const wishlistSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Wishlist = mongoose.model<WishlistDocument>('Wishlist', wishlistSchema);

/*****************************************End Wishlist schema***************************************************************************** */
/*****************************************Start Address schema***************************************************************************** */

export interface AddressDocument extends Document {
    user: mongoose.Schema.Types.ObjectId;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}

const addressSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Address = mongoose.model<AddressDocument>('Address', addressSchema);

/*****************************************End Address schema***************************************************************************** */





