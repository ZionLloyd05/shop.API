const validator = require('validator');
const IsEmpty = require('./isEmpty');

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
  if (validator.isEmail(userData.email)) {
    errors.email = 'Email is invalid';
  }

  // Password Validations
  if (validator.isEmpty(userData.password)) {
    errors.password = 'Password cannot be empty';
  }
  if (validator.isLength(userData.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }

  return {
    errors,
    isValid: IsEmpty(errors),
  };
};
