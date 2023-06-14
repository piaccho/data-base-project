import express from 'express';
import adminController from '#root/src/controllers/adminController.js';
import authController from '#root/src/controllers/authController.js';

const router = express.Router();

// router.use(authController.accessTokenVerifyAdmin)

// main
router.get('/', adminController.getIndex);

// show product to modify
router.get('/product', adminController.showProductToModify);

// add product to db
router.post('/add-product', adminController.addProduct);

// modify product data
router.post('/modify-product', adminController.modifyProduct);

// delete product from db
router.post('/delete-product', adminController.deleteProduct);

// add category to db
router.post('/add-category', adminController.addCategory);

// delete category from db
router.post('/delete-category', adminController.deleteCategory);

export default router;