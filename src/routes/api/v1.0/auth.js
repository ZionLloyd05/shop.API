const express = require('express');

const router = express.Router();

const authService = require('../../../services/auth.service');

// Load Input Validation
const validationRegisterInput = require('../../../validator/register');
const validationLoginInput = require('../../../validator/login');

router

// @route   GET api/v1.0/auth/test
// @desc    Tests auth route
// @access  Public
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/auth/register
// @desc    Register user
// @access  Public
  .post('/register', async (req, res) => {
    try {
      const { errors, isValid } = validationRegisterInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'failed', data: errors });
        return;
      }

      const newUser = req.body;
      const result = await authService.register(newUser);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'failed', data: error });
    }
  })

// @route   GET api/v1.0/auth/login
// @desc    Login user / Returns jwt token if account's valid
// @access  Public
  .post('/login', async (req, res) => {
    try {
      const { errors, isValid } = validationLoginInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'failed', data: errors });
        return;
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'failed', data: error });
    }
  });

module.exports = router;
