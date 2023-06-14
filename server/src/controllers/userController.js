import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
import User from '#root/src/models/userModel.js'
import Order from '#root/src/models/orderModel.js'
import Wishlist from '#root/src/models/wishlistModel.js'

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
};

export default userController;