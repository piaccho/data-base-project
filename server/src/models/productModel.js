import mongoose from 'mongoose';
import { Schema } from "mongoose";
import { userSchema } from '#root/src/models/userModel.js'

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true,
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

const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);

export { productSchema, Review }
export default Product;