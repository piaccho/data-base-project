import express from 'express';
import authController from '#root/src/controllers/authController.js';

const router = express.Router();

// login view
router.get('/sign-in', authController.getLoginView);

// register view
router.get('/sign-up', authController.getRegisterView);

// create account
router.post('/sign-up', authController.createAccount);

// sign in
router.post('/sign-in', authController.signIn);

// refresh
router.post('/refresh', authController.refreshTokenVerify); 

export default router;