import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
import User from '#root/src/models/userModel.js'
import Order from '#root/src/models/orderModel.js'
import Wishlist from '#root/src/models/wishlistModel.js'

import { signinUser, signinUserId, userQuery } from '#root/src/util/utility.js'

const userController = {
    getProfileIndex: async (req, res) => {
        // const categories = await Category.find({});
        res.render('profile');
    },

    getOrdersIndex: async (req, res) => {
        // const categories = await Category.find({});
        res.render('orders');
    },

    getWishlistsIndex: async (req, res) => {
        // const categories = await Category.find({});
        res.render('wishlists');
    },

    getCartIndex: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);
        res.render('cart', {user: user});
    },

    clearCart: async (req, res) => {
        const { userid } = req.body;
        const user = await signinUserId(userid);
        
        user.cart.totalquantity = 0;
        user.cart.totalprice = 0;
        user.cart.items = [];
        await user.save();

        res.redirect("/user/cart" + userQuery(user));
    },

    modifyCartItem: async (req, res) => {
        let newQuantity = parseInt(req.body.quantity);
        const { productid, userid } = req.body
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })

        const product = await Product.findById(productid);

        // check if cartItem exists
        const modifiedItem = user.cart.items.find(item => item.product.equals(product));

        if (!modifiedItem) {
            return res.status(400).json({ error: 'Cannot find an a product' });
        } 

        if (newQuantity > product.units) {
            return res.status(400).json({ error: 'Quantity exceeds product units' });
        }

        const previousQuantity = modifiedItem.quantity;
        modifiedItem.quantity = newQuantity;

        // update total price and quantity
        user.cart.totalQuantity = user.cart.totalQuantity - previousQuantity + newQuantity;
        user.cart.totalPrice = user.cart.totalPrice + (newQuantity - previousQuantity) * product.price;

        await user.save();

        res.redirect("/user/cart" + userQuery(user));
    },

    deleteCartItem: async (req, res) => {
        const { productid, userid } = req.body
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })

        const product = await Product.findById(productid);

        // check if cartItem exists
        const deletedItem = user.cart.items.find(item => item.product.equals(product));

        if (!deletedItem) {
            return res.status(400).json({ error: 'Cannot find an a product' });
        }

        const removedItem = user.cart.items.splice(deletedItem, 1)[0];

        // update total price and quantity
        user.cart.totalQuantity -= removedItem.quantity;
        user.cart.totalPrice -= removedItem.quantity * product.price;

        await user.save();

        res.redirect("/user/cart" + userQuery(user));
    },

    proceedOrder: async (req, res) => {
        // res.render('product', { product: product });
    },
};

export default userController;