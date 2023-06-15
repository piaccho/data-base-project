// cart
// product

import express from 'express';
import indexController from '#root/src/controllers/indexController.js';

const router = express.Router();

// main
router.get('/', indexController.getIndex);

// get all products
router.get('/products', indexController.getAllProducts);

// get products by category
router.get('/products/:category', indexController.getProductsByCategory);

// get products by keywords
router.get('/search', indexController.searchProductsByKeywords);

// show product
router.get('/product', indexController.showProduct);

// post review
router.post('/product/review', indexController.postReview);

// add product to cart
router.post('/add-product-to-cart', indexController.addProductToCart);

// =============
// AUTHENTICATED
// =============

// add product to wishlist
router.post('/add-product-to-wishlist', indexController.addProductToWishlist);


export default router;