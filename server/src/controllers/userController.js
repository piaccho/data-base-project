import mongoose from 'mongoose';
import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
import Cart from '#root/src/models/cartModel.js'

const uri = process.env.MONGODB_URI || 'mongodb+srv://piacho:piacho123@db-mongodb.axn6csn.mongodb.net/webshop?retryWrites=true&w=majority'

// connect to db
await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
        process.exit();
    });

const userController = {
    getIndex: async (req, res) => {
        const categories = await Category.find({});
        res.render('index', { categories: categories, user: true });
    },

    addProductToCart: async (req, res) => {
        const {
            productid,
            quantity,
        } = req.body;

        console.log(req.body);
        // 

        // const productId = req.query.productid;
        // const product = await Product.find({ _id: productId });
        // res.render('product', { product: product });
    }
};

export default userController;