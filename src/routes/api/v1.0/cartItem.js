const express = require('express');
const passport = require('passport');

const router = express.Router();

const cartItemService = require('../../../services/cartItem.service');

router
// @route   GET api/v1.0/products/test
// @desc    Tests product route
// @access  Public
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   POST api/v1.0/cartItems/
// @desc    Adding cartitem to cart
// @access  Private
  .post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const result = await cartItemService.addToCart(userId, productId, quantity);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   GET api/v1.0/cartItems/
// @desc    Get all cart items for a user
// @access  Private
  .get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await cartItemService.getUserCartItems(userId);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   DEL api/v1.0/cartItems/{productId}
// @desc    Remove cartItem
// @access  Private
  .delete('/:productId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const result = await cartItemService.removeCartItem(userId, productId);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  });
module.exports = router;
