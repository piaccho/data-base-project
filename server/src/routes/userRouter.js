// index
// orders
// account (profile)
// wishlists

// cart
// order

import express from 'express';
import indexController from '#root/src/controllers/indexController.js';
import userController from '#root/src/controllers/userController.js';


const router = express.Router();

// main
router.get('/', userController.getIndex);

// get all products
router.get('/products', indexController.getAllProducts);

// get products by category
router.get('/products/:category', indexController.getProductsByCategory);

// get products by keywords
router.get('/search', indexController.searchProductsByKeywords);

// show product
router.get('/product', indexController.showProduct);

// add product to cart
router.post('/add-product-to-cart', userController.addProductToCart);

export default router;