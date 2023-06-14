import mongoose, { Schema } from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],
    total: {
        type: Number,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
