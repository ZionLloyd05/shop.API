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
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/products
// @desc    Get all products
// @access  Private
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
// @desc    Delete a product
// @access  Private
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
