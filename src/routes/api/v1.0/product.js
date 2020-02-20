const express = require('express');
const multer = require('multer');
const passport = require('passport');

const productService = require('../../../services/product.service');

const router = express.Router();

// Configuring Multer for Multipart/Enctype data
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    // accept image files only
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({
        message: 'Invalid file format',
      }, false);
    }
  },
});

// Loading input validation
const validationProductInput = require('../../../validator/product');

router

/**
 * @TODO
 * Only admin should be able to access certain route
 */

// @route   GET api/v1.0/products/test
// @desc    Tests product route
// @access  Public
  .get('/ping', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/products
// @desc    Get all products
// @access  Private
/**
 * @swagger
 * /api/v1.0/products:
 *  get:
 *    description: Get all product
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: All products was returned
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const result = await productService.getAllProducts();
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   GET api/v1.0/products/{id}
// @desc    Get a product
// @access  Private
/**
 * @swagger
 * /api/v1.0/products/{id}:
 *  get:
 *    description: Get a product by id
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: Product was returned
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const productId = req.params.id;
      const result = await productService.getProduct(productId);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   POST api/v1.0/products
// @desc    Post a product
// @access  Private
/**
 * @swagger
 * /api/v1.0/products:
 *  post:
 *    description: Create a product
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
 *            - name
 *            - description
 *            - category
 *            - price
 *            - inStock
 *          properties:
 *            name:
 *              type: string
 *              description: Product name
 *            image:
 *              type: file
 *              description: Product image
 *            description:
 *              type: string
 *              description: Product description
 *            category:
 *              type: string
 *              description: Product category
 *            price:
 *              type: float
 *              description: Price of product
 *            inStock:
 *              type: boolean
 *              description: Describes product current availability
 *    responses:
 *      '201':
 *        description: Product was created
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
      const { errors, isValid } = validationProductInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'failed', data: errors });
        return;
      }

      const newProduct = req.body;
      const result = await productService.createNewProduct(newProduct, req.file);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   PUT api/v1.0/products/{id}
// @desc    Update a product
// @access  Private
/**
 * @swagger
 * /api/v1.0/products/{id}:
 *  put:
 *    description: Update existing product
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
 *          properties:
 *            name:
 *              type: string
 *              description: Product name
 *            image:
 *              type: file
 *              description: Product image
 *            description:
 *              type: string
 *              description: Product description
 *            category:
 *              type: string
 *              description: Product category
 *            price:
 *              type: float
 *              description: Price of product
 *            inStock:
 *              type: boolean
 *              description: Describes product current availability
 *    responses:
 *      '200':
 *        description: Product was updated successfully
 *      '400':
 *        description: Invalid data supplied
 *      '404':
 *        description: Product not found
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .put('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
      const { errors, isValid } = validationProductInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'failed', data: errors });
        return;
      }

      const productFromUser = req.body;
      const productId = req.params.id;
      const result = await productService.updateProduct(productFromUser, req.file, productId);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   DELETE api/v1.0/products/{id}
// @desc    Sets product to out of stock
// @access  Private
/**
 * @swagger
 * /api/v1.0/products/{id}:
 *  delete:
 *    description: Sets product to out of stock
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: Product was set to out of stock
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '404':
 *        description: Product not found
 *      '500':
 *        description: Internal server error
 */
  .delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const productId = req.params.id;
      const result = await productService.removeProduct(productId);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  });

module.exports = router;
