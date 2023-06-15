import express from 'express';
import userController from '#root/src/controllers/userController.js';


const router = express.Router();

// get profile page 
router.get('/profile', userController.getProfileIndex);

// get orders page 
router.get('/orders', userController.getOrdersIndex);

// get wishlists page 
router.get('/wishlists', userController.getWishlistsIndex);

// get cart page 
router.get('/cart', userController.getCartIndex);

// clear cart 
router.post('/cart/delete-all', userController.clearCart);

// clear cart 
router.post('/cart/modify', userController.modifyCartItem);

// clear cart 
router.post('/cart/delete', userController.deleteCartItem);

// proceed order
router.post('/order', userController.proceedOrder);

export default router;