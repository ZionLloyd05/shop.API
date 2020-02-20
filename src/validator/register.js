const validator = require('validator');
const IsEmpty = require('../helpers/isEmpty');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  const userData = data;

  // Catering for missing inputs
  userData.firstname = !IsEmpty(userData.firstname) ? userData.firstname : '';
  userData.lastname = !IsEmpty(userData.lastname) ? userData.lastname : '';
  userData.email = !IsEmpty(userData.email) ? userData.email : '';
  userData.password = !IsEmpty(userData.password) ? userData.password : '';
  userData.cpassword = !IsEmpty(userData.cpassword) ? userData.cpassword : '';

  //  Firstname Validations
  if (!validator.isLength(userData.firstname, { min: 3, max: 30 })) {
    errors.firstname = 'Firstname must be between 3 and 30 characters';
  }
  if (validator.isEmpty(userData.firstname)) {
    errors.firstname = 'Firstname cannot be empty';
  }

  //  Lastname Validations
  if (!validator.isLength(userData.lastname, { min: 3, max: 30 })) {
    errors.lastname = 'Lastname must be between 3 and 30 characters';
  }
  if (validator.isEmpty(userData.lastname)) {
    errors.lastname = 'Lastname cannot be empty';
  }

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
  if (!validator.isLength(userData.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }

  // Confirm Password Validations
  if (validator.isEmpty(userData.cpassword)) {
    errors.confirmPassword = 'Confirm Password cannot be empty';
  }
  if (!validator.equals(userData.cpassword, userData.password)) {
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    isValid: IsEmpty(errors),
  };
};
