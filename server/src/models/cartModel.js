import mongoose from 'mongoose';
import { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;