import mongoose from 'mongoose';
import { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
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
});

export const Product = mongoose.model('Product', productSchema);
