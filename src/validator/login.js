const validator = require('validator');
const IsEmpty = require('../helpers/isEmpty');

module.exports = function validationLoginInput(data) {
  const errors = {};
  const userData = data;

  // Catering for missing inputs
  userData.email = !IsEmpty(userData.email) ? userData.email : '';
  userData.password = !IsEmpty(userData.password) ? userData.password : '';

  // Email Validations
  if (validator.isEmpty(userData.email)) {
    errors.email = 'Email cannot be empty';
  }
  if (!validator.isEmail(userData.email)) {
    errors.email = 'Email is invalid';
  }

  // Password Validations
  if (validator.isEmpty(userData.password)) {
    errors.password = 'Password cannot be empty';
  }

  return {
    errors,
    isValid: IsEmpty(errors),
  };
};
