import mongoose, { Schema } from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: true,
//     },
//     review: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const productSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     units: {
//         type: Number,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     reviews: [
//         reviewSchema
//     ]
// });

// const orderSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     products: [{
//         product: productSchema,
//         quantity: {
//             type: Number,
//             required: true,
//         },
//     }],
//     total: {
//         type: Number,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'shipped', 'delivered'],
//         default: 'pending',
//     },
// });

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    totalQuantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
export { orderSchema };
