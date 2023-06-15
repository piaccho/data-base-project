import mongoose from 'mongoose';
import { Schema } from "mongoose";
import { userSchema } from '#root/src/models/userModel.js'

const reviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    reviews: [
        reviewSchema
    ]
});

const Product = mongoose.model('Product', productSchema);

export { productSchema }
export default Product;