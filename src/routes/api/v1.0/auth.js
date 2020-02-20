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
  .get('/ping', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/auth/register
// @desc    Register user
// @access  Public
/**
 * @swagger
 * /api/v1.0/auth/register:
 *  post:
 *    description: Use to register a user
 *    produces:
 *      application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - firstname
 *            - lastname
 *            - email
 *            - password
 *            - cPassword
 *          properties:
 *            firstname:
 *              type: string
 *              description: User firstname
 *            lastname:
 *              type: string
 *              description: User lastname
 *            email:
 *              type: string
 *              description: User email
 *            password:
 *              type: string
 *              description: User password
 *            cpassword:
 *              type: string
 *              description: User retyped-password to ensure secuirity
 *    responses:
 *      '201':
 *        description: User was registered successfully
 *      '400':
 *        description: Invalid registration data supplied
 *      '500':
 *        description: Internal server error
 */
  .post('/register', async (req, res) => {
    try {
      const { errors, isValid } = validationRegisterInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'error', data: errors });
        return;
      }

      const newUser = req.body;
      const result = await authService.register(newUser);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   GET api/v1.0/auth/login
// @desc    Login user / Returns jwt token if account's valid
// @access  Public
/**
 * @swagger
 * /api/v1.0/auth/login:
 *  post:
 *    description: Use to create auth token for users
 *    produces:
 *      application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *              description: User email
 *              example: alagbaladamilola@gmail.com
 *            password:
 *              type: string
 *              description: User password
 *              example: dami123*
 *    responses:
 *      '200':
 *        description: User was successfully authenticated
 *      '400':
 *        description: Invalid data supplied
 *      '500':
 *        description: Internal server error
 */
  .post('/login', async (req, res) => {
    try {
      const { errors, isValid } = validationLoginInput(req.body);
      // check validation
      if (!isValid) {
        res.status(400).json({ status: 'error', data: errors });
        return;
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  });

module.exports = router;
