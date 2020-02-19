module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {});
  CartItem.associate = (models) => {
    // associations can be defined here
    CartItem.belongsTo(models.Product, {
      foregnKey: 'productId',
      as: 'product',
    });
    CartItem.belongsTo(models.User, {
      foregnKey: 'userId',
      as: 'user',
    });
  };
  return CartItem;
};
