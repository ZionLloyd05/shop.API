const express = require('express');

const router = express.Router();

// @route   GET api/v1.0/users/test
// @desc    Tests user route
// @access  Public
router
  .get('/test', (req, res) => {
    res.json({ status: 'success', data: 'nil' });
  });

module.exports = router;
