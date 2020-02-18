const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const cartItemRouter = require('./cartItem');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cartItems', cartItemRouter);

module.exports = router;
