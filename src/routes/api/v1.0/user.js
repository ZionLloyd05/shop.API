const express = require('express');
const passport = require('passport');

const router = express.Router();

router

// @route   GET api/v1.0/users/test
// @desc    Tests user route
// @access  Public
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  })

// @route   GET api/v1.0/users/current
// @desc    Return current user
// @access  Private
  .get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
  });

module.exports = router;
