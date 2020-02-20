const express = require('express');
const passport = require('passport');

const router = express.Router();

const userService = require('../../../services/user.service');

router

/**
 * @TODO
 * Only admin should be able to access certain route
 */

// @route   GET api/v1.0/users/test
// @desc    Tests user route
// @access  Public
  .get('/ping', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/users
// @desc    Return all users
// @access  Private
/**
 * @swagger
 * /api/v1.0/users:
 *  get:
 *    description: Get all users
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: All users was returned
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const result = await userService.getAllUsers();
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   GET api/v1.0/users/{id}
// @desc    Return a user by id
// @access  Private
/**
 * @swagger
 * /api/v1.0/users/{id}:
 *  get:
 *    description: Get a users by id
 *    produces:
 *      application/json
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      '200':
 *        description: User was returned
 *      '400':
 *        description: Invalid data supplied
 *      '401':
 *        description: Unauthorized user
 *      '500':
 *        description: Internal server error
 */
  .get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const result = await userService.getUserById(req.params.id);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  });

module.exports = router;
