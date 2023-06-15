import mongoose from 'mongoose';
import { Schema } from "mongoose";

export const reviewSchema = new mongoose.Schema({
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

const Review = mongoose.model('Review', reviewSchema);

export default Review;