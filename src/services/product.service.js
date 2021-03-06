
const productController = require('../controllers/product.controller');

const { isAuthorized } = require('../services/auth.service');

exports.createNewProduct = async (productToCreate, file, user) => {
  if (!isAuthorized(user)) {
    console.log('authorize msg');
    console.log('not admin');
    const statusCode = 401;
    return {
      toReturn: { status: 'error', data: 'UnAuthorized' },
      statusCode,
    };
  }
  console.log('admin');
  const result = await productController.createProduct(productToCreate, file);

  if (typeof result === 'string') {
    const statusCode = 500;
    return {
      toReturn: { status: 'error', data: result },
      statusCode,
    };
  }

  const statusCode = 201;
  return {
    toReturn: { status: 'success', data: result },
    statusCode,
  };
};

exports.getAllProducts = async () => {
  const productsReturn = await productController.getProducts();

  if (typeof productsReturn === 'string') {
    const error = productsReturn;
    const statusCode = 500;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: productsReturn },
    statusCode,
  };
  return result;
};

exports.getProduct = async (productId) => {
  const productReturn = await productController.getProductById(productId);

  if (typeof productReturn === 'string') {
    const error = productReturn;
    const statusCode = 404;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: productReturn },
    statusCode,
  };
  return result;
};

exports.updateProduct = async (productFromUser, file, productId, user) => {
  if (!isAuthorized(user)) {
    const statusCode = 401;
    return {
      toReturn: { status: 'error', data: 'UnAuthorized' },
      statusCode,
    };
  }
  const updatedProductReturn = await productController.updateProduct(
    productFromUser, file, productId,
  );

  if (typeof updatedProductReturn === 'string') {
    const error = updatedProductReturn;
    const statusCode = 404;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: updatedProductReturn },
    statusCode,
  };
  return result;
};

exports.removeProduct = async (productId, user) => {
  if (!isAuthorized(user)) {
    const statusCode = 401;
    return {
      toReturn: { status: 'error', data: 'UnAuthorized' },
      statusCode,
    };
  }

  try {
    const result = await productController.removeProduct(productId);

    if (typeof result === 'string') {
      const error = result;
      const statusCode = 404;
      return {
        toReturn: { status: 'error', data: error },
        statusCode,
      };
    }

    if (result) {
      const statusCode = 200;
      return {
        toReturn: { status: 'success', data: null },
        statusCode,
      };
    }

    const statusCode = 404;
    return {
      toReturn: { status: 'error', data: 'Product not found' },
      statusCode,
    };
  } catch (error) {
    const statusCode = 500;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }
};
