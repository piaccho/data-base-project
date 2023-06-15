import mongoose from 'mongoose';
import { Schema } from "mongoose";
import {reviewSchema} from '#root/src/models/reviewModel.js'

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