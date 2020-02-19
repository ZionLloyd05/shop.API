const cartItemController = require('../controllers/cartItem.controller');
const productController = require('../controllers/product.controller');

exports.addToCart = async (userId, productId, quantity) => {
  try {
    const product = await productController.getProductById(productId);

    if (!product.inStock) {
      const statusCode = 400;
      return {
        toReturn: { status: 'success', data: 'Product is not available' },
        statusCode,
      };
    }

    const cartItemReturn = await cartItemController.getCartItemByUserIdAndProductId(
      userId, productId,
    );

    if (cartItemReturn && (typeof cartItemReturn !== 'string')) {
      // Means cart item already exists

      const { id, total } = cartItemReturn;
      const newTotal = total + (quantity * product.price);
      const newQuantity = cartItemReturn.quantity + quantity;

      const cartItemUpdateInput = {
        id,
        productId,
        userId,
        quantity: newQuantity,
        total: newTotal,
      };

      await cartItemController.updateCartItem(cartItemUpdateInput);

      const statusCode = 200;
      return {
        toReturn: { status: 'success', data: null },
        statusCode,
      };
    }

    // Dealing with a new entry
    console.log('cart item is new');
    const total = product.price * quantity;

    const newCartItemInput = {
      productId,
      userId,
      quantity,
      total,
    };


    const result = await cartItemController.createCartItem(newCartItemInput);

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
  } catch (error) {
    const statusCode = 500;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }
};


exports.getUserCartItems = async (userId) => {
  const cartItemReturn = await cartItemController.getCartItemByUserId(userId);

  if (typeof cartItemReturn === 'string') {
    const error = cartItemReturn;
    const statusCode = 404;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: cartItemReturn },
    statusCode,
  };
  return result;
};

exports.removeCartItem = async (userId, productId) => {
  try {
    const product = await productController.getProductById(productId);

    const cartItemReturn = await cartItemController.getCartItemByUserIdAndProductId(
      userId, productId,
    );

    if (typeof cartItemReturn === 'string') {
      const error = cartItemReturn;
      const statusCode = 404;
      return {
        toReturn: { status: 'error', data: error },
        statusCode,
      };
    }

    if (cartItemReturn.quantity > 1) {
      const { id, total } = cartItemReturn;
      const newTotal = total - product.price;
      const newQuantity = cartItemReturn.quantity - 1;

      const cartItemUpdateInput = {
        id,
        productId,
        userId,
        quantity: newQuantity,
        total: newTotal,
      };

      await cartItemController.updateCartItem(cartItemUpdateInput);
    } else if (cartItemReturn.quantity === 1) {
      await cartItemController.deleteCartItem(cartItemReturn.id);
    }

    const statusCode = 200;
    return {
      toReturn: { status: 'success', data: null },
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
