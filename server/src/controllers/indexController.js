import Category from '#root/src/models/categoryModel.js'
import Product, { Review } from '#root/src/models/productModel.js'

import { isTokenValid, signinUser, signinUserId, userQuery } from '#root/src/util/utility.js'

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

        let averageRating;
        if (!product.reviews || product.reviews.length === 0) {
            averageRating = 0;
        } else {
            const ratings = product.reviews.map(review => review.rating);
            averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        }

        res.render('product', { product: product, user: user, avgRating: averageRating });
    },

    postReview: async (req, res) => {
        const {rating, description, productid, userid} = req.body;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })
        
        // check if product exists
        const product = await Product.findOne({ _id: productid });
        if(!product) {
            return res.status(400).json({ error: 'Couldnt find the product' });
        }

        // create new review
        const newReview = new Review({
            username: user.username,
            rating,
            description
        });

        product.reviews.push(newReview);

        await product.save();

        res.redirect("/products" + userQuery(user));
    },

    addProductToCart: async (req, res) => {
        let quantity = parseInt(req.body.quantity);
        const {productid, userid} = req.body
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })

        const product = await Product.findById(productid);

        // check if cartItem exists
        const existingItem = user.cart.items.find(item => item.product.equals(product));

        if (existingItem) {
            if (existingItem.quantity + quantity > product.units) {
                return res.status(400).json({ error: 'Quantity exceeds product units' });
            }
            existingItem.quantity += quantity;
        } else {
            if (quantity > product.units) {
                return res.status(400).json({ error: 'Quantity exceeds product units' });
            }
            user.cart.items.push({ product: product, quantity });
        }

        // update total price and quantity
        user.cart.totalQuantity += quantity;
        user.cart.totalPrice += quantity * product.price;

        await user.save();

        res.redirect("/products" + userQuery(user));
    },

    addProductToWishlist: async (req, res) => {
        
        // res.render('addingToWishlist', { product: product });
    },
};

export default indexController;