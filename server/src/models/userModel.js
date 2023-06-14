import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
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
        {
            type: Schema.Types.ObjectId,
            ref: 'Wishlist',
            default: [],
            required: true,
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            default: [],
            required: true,
        }
    ],
    preferedpayment: {
        type: String,
        trim: true,
        enum: ['card', 'paypal', 'on-delivery'],
        default: 'on-delivery',
        required: true,
    },
    cart: {
        items: [{
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
        total: {
            type: Number,
            required: true,
            default: 0,
        }
    },
});

const User = mongoose.model('User', userSchema);

export default User;
