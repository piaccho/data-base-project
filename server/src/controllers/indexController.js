import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'

import { isTokenValid, signinUser, signinUserId } from '#root/src/util/utility.js'

const indexController = {
    getIndex: async (req, res) => {
        // let user = null;
        // if (req.headers.authorization) {
        //     const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ');
        //     const { valid, userid } = isTokenValid(AUTHORIZATION_TOKEN);
        //     if (valid) user = userid;
        // }

        const user = await signinUser(req.query.username, req.query.password);

        const categories = await Category.find({});
        res.render('index', { categories: categories, user: user});
    },

    getAllProducts: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);

        const allProducts = await Product.find({});
        res.render("products", { data: allProducts, user: user });
    },

    getProductsByCategory: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);

        const queryCategory = req.query.category;
        const allProductsByCategory = await Product.find({ category: queryCategory });
        res.render("products", { data: allProductsByCategory, user: user });
    },

    searchProductsByKeywords: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);

        const query = req.query.query;
        const allProductsByQuery = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        res.render("products", { data: allProductsByQuery, user: user });
    },

    showProduct: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);

        const productId = req.query.productid;
        const product = await Product.findOne({ _id: productId });
        res.render('product', { product: product, user: user });
    },

    addProductToCart: async (req, res) => {
        console.log(req.body);
        
        const {quantity, productid, userid} = req.body
        const user = await signinUserId(userid);

        console.log(user);
        const product = await Product.findById(productid);
        if (product.units < quantity) res.status(400).json({ status: "Quantity exceeds product units"})

        const item = { product: product, quantity: quantity };
        
        user.cart.items.push(item);
        user.save((err, user) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Added new item to cart:', user.cart.items);
            }});
        
        product.units -= quantity;
        product.save((err, product) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Updated units of:', product.name);
            }
        });

        const allProducts = await Product.find({});
        res.render("products", { data: allProducts, user: user });
    },

    addProductToWishlist: async (req, res) => {
        
        res.render('addingToWishlist', { product: product });
    },

    proceedOrder: async (req, res) => {
        // res.render('product', { product: product });
    },
};

export default indexController;