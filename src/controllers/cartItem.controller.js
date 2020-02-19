const { Op } = require('sequelize');
const models = require('../database/models');
const IsEmpty = require('../helpers/isEmpty');

exports.createCartItem = async (newCartItemInput) => {
  try {
    const cartItem = await models.CartItem.create(newCartItemInput);
    return cartItem;
  } catch (error) {
    console.log(error);
    return 'Something bad happened';
  }
};

exports.getCartItemByUserIdAndProductId = async (userId, productId) => {
  console.log('getting cart item');
  const cartItem = await models.CartItem.findOne({
    where: {
      [Op.and]: [
        { userId },
        { productId },
      ],
    },
  });

  if (!cartItem) {
    return 'Cart item not found';
  }

  return cartItem;
};

exports.getCartItemById = async (id) => {
  const cartItem = await models.CartItem.findOne({
    where: { id },
  });

  if (!cartItem) {
    return 'Cart item not found';
  }

  return cartItem;
};

exports.getCartItemByUserId = async (userId) => {
  const cartItem = await models.CartItem.findAll({
    where: { userId },
  });

  if (IsEmpty(cartItem)) {
    return 'Cart item not found';
  }

  return cartItem;
};

exports.updateCartItem = async (cartItemUpdateInput) => {
  const { id } = cartItemUpdateInput;
  try {
    const [updated] = await models.CartItem.update(cartItemUpdateInput, {
      where: { id },
    });


    if (updated) {
      const updatedCartitem = await this.getCartItemById(id);

      return updatedCartitem;
    }

    return 'CartItem not found';
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteCartItem = async (cartItemId) => {
  try {
    const deleted = await models.CartItem.destroy({
      where: { id: cartItemId },
    });

    if (deleted) {
      return null;
    }

    return 'CartItem not found';
  } catch (error) {
    console.log(error);
    return error;
  }
};
