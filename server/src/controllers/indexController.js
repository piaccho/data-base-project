import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
import Cart from '#root/src/models/cartModel.js'

const indexController = {
    getIndex: async (req, res) => {
        const categories = await Category.find({});
        res.render('index', { categories: categories });
    },

    getAllProducts: async (req, res) => {
        const allProducts = await Product.find({});
        res.render("products", { data: allProducts });
    },

    getProductsByCategory: async (req, res) => {
        const queryCategory = req.query.category;
        const allProductsByCategory = await Product.find({ category: queryCategory });
        res.render("products", { data: allProductsByCategory });
    },

    searchProductsByKeywords: async (req, res) => {
        const query = req.query.query;
        const allProductsByQuery = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        res.render("products", { data: allProductsByQuery });
    },

    showProduct: async (req, res) => {
        const productId = req.query.productid;
        const product = await Product.findOne({ _id: productId });
        res.render('product', { product: product });
    }
};

export default indexController;