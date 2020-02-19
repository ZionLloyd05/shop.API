const validator = require('validator');
const IsEmpty = require('../helpers/isEmpty');

module.exports = function validationProductInput(data) {
  const errors = {};
  const productData = data;

  console.log(productData);

  // Catering for missing inputs
  productData.name = !IsEmpty(productData.name) ? productData.name : '';
  productData.description = !IsEmpty(productData.description) ? productData.description : '';
  productData.category = !IsEmpty(productData.category) ? productData.category : '';
  productData.price = !IsEmpty(productData.price) ? productData.price : '';
  productData.inStock = !IsEmpty(productData.inStock) ? productData.inStock : '';

  // Name Validations
  if (!validator.isLength(productData.name, { min: 3, max: 40 })) {
    errors.name = 'Name must be between 3 and 40 characters';
  }
  if (validator.isEmpty(productData.name)) {
    errors.name = 'Name cannot be empty';
  }

  // Description Validations
  if (!validator.isLength(productData.description, { min: 3, max: 255 })) {
    errors.description = 'Description must be between 3 and 255 characters';
  }
  if (validator.isEmpty(productData.description)) {
    errors.description = 'Description cannot be empty';
  }

  // Category Validations
  if (!validator.isLength(productData.category, { min: 3, max: 255 })) {
    errors.category = 'Category must be between 3 and 255 characters';
  }
  if (validator.isEmpty(productData.category)) {
    errors.category = 'Category cannot be empty';
  }

  // Price Validations
  if (!validator.isCurrency(productData.price)) {
    errors.price = 'Invalid price';
  }
  if (validator.isEmpty(productData.price)) {
    errors.price = 'Price cannot be empty';
  }

  // InStock Validations
  if ((!validator.equals(productData.inStock, 'true')) || (!validator.equals(productData.inStock, 'false'))
  ) {
    errors.inStock = 'Invalid instock value';
  }
  if (validator.isEmpty(productData.inStock)) {
    errors.inStock = 'InStock cannot be empty';
  }

  return {
    errors,
    isValid: IsEmpty(errors),
  };
};
