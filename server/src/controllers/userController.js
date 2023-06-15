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
        const userid = req.query.userid;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" });

        res.render('orders', { user: user })
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
        
        user.cart.totalQuantity = 0;
        user.cart.totalPrice = 0;
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

    getOrderIndex: async (req, res) => {
        const userid = req.query.userid;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" });

        res.render('order', { user: user });
    },

    proceedOrder: async (req, res) => {
        console.log(req.body);
        const userid = req.body.userid;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" });

        let total = 0;
        for (const item of user.cart.items) {
            const productId = item.product._id;
            const quantity = item.quantity;

            const product = await Product.findById(productId);
            if (!product) {
                console.log(`Couldnt find product ${productId}.`);
                continue;
            }

            product.units -= quantity;
            total = quantity * product.price;

            await product.save();

            console.log(`Updated product units ${product.name}.`);
        }

        user.cart.items.forEach(item => {console.log(item);})

        const newOrder = new Order({
            user: user,
            products: user.cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
            })),
            totalQuantity: user.cart.totalQuantity,
            totalPrice: user.cart.totalPrice,
            address: user.address,
            status: 'pending',
        });


        await newOrder.save();

        user.cart.totalQuantity = 0;
        user.cart.totalPrice = 0;
        user.cart.items = [];
        user.orders.push(newOrder);
        await user.save();

        res.redirect("/" + userQuery(user));
    },
};

export default userController;