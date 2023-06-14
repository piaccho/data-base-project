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

const indexController = {
    getIndex: async (req, res) => {
        const categories = await Category.find({});
        res.render('index', { categories: categories });
    },

    getAllProducts: async (req, res) => {
        const allProducts = await (async () => {
            try {
                return await Product.find({});
            } catch (err) {
                console.error(err);
            }
        })();
        res.render("products", { data: allProducts });
    },

    getProductsByCategory: async (req, res) => {
        const queryCategory = req.query.category;
        const allProductsByCategory = await (async () => {
            try {
                return await Product.find({ category: queryCategory });
            } catch (err) {
                console.error(err);
            }
        })();
        res.render("products", { data: allProductsByCategory });
    },

    searchProductsByKeywords: async (req, res) => {
        const query = req.query.query;
        const allProductsByQuery = await (async () => {
            try {
                return await Product.find({
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                    ]
                });
            } catch (err) {
                console.error(err);
            }
        })();
        res.render("products", { data: allProductsByQuery });
    },

    showProduct: async (req, res) => {
        const productId = req.query.productid;
        const product = await Product.findOne({ _id: productId });
        res.render('product', { product: product });
    }
};

export default indexController;