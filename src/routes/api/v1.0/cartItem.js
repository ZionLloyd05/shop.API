const express = require('express');
const passport = require('passport');

const router = express.Router();

const cartItemService = require('../../../services/cartItem.service');

/**
 * @TODO
 * Make Bearer Token security scheme display in swagger docs
 */

router
// @route   GET api/v1.0/products/test
// @desc    Tests product route
// @access  Public
  .get('/ping', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   POST api/v1.0/cartItems/
// @desc    Adding cartitem to cart
// @access  Private
/**
 * @swagger
 * /api/v1.0/cartItems:
 *  post:
 *    description: Adding product to cart
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    parameters:
 *      - in: body
 *        name: name
 *        description: Name of product
 *        schema:
 *          type: object
 *          required:
 *            - productId
 *            - quantity
 *          properties:
 *            productId:
 *              type: integer
 *              description: Id of product to be added to cart
 *            quantity:
 *              type: integer
 *              description: Amount of product to be added to cart
 *    responses:
 *      '200':
 *        description: Product added to cart succcessfully
 *      '201':
 *        description: New cart item was create (For non existing product in the cart)
 *      '400':
 *        description: Product to be added is not available (or not in stock)
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */

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
/**
 * @swagger
 * /api/v1.0/cartItems:
 *  get:
 *    description: Get user's cart
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: User's cart was returned
 *      '401':
 *        description: Unauthorized user
 *      '404':
 *        description: Cart not found
 *      '500':
 *        description: Internal server error
 */
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
/**
 * @swagger
 * /api/v1.0/cartItems/{productId}:
 *  delete:
 *    description: Removes product from user's cart
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: Product was removed successfully
 *      '401':
 *        description: Unauthorized user
 *      '404':
 *        description: Cart not found
 *      '500':
 *        description: Internal server error
 */
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
