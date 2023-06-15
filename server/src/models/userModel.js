import mongoose, { Schema } from 'mongoose';
import { wishlistSchema } from '#root/src/models/wishlistModel.js'
import { orderSchema } from '#root/src/models/orderModel.js'

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

export const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
    wishlists: [
        wishlistSchema
    ],
    orders: [
        orderSchema
    ],
    preferedpayment: {
        type: String,
        trim: true,
        enum: ['card', 'paypal', 'on-delivery'],
        default: 'on-delivery',
        required: true,
    },
    cart: {
        items: [
            {
                product: productSchema,
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ],
        totalQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        }
    },
});

const User = mongoose.model('User', userSchema);

export default User;
