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
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/users
// @desc    Return all users
// @access  Private
  .get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const result = await userService.getAllUsers();
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })

// @route   GET api/v1.0/users
// @desc    Return all users
// @access  Private
  .get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const result = await userService.getUserById(req.params.id);
      const { statusCode, toReturn } = result;
      res.status(statusCode).json(toReturn);
    } catch (error) {
      res.status(500).json({ status: 'error', data: error });
    }
  })


// @route   GET api/v1.0/users/current
// @desc    Return current user
// @access  Private
  .get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
  });


module.exports = router;
