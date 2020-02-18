module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    inStock: DataTypes.BOOLEAN,
  }, {});
  Product.associate = () => {
    // associations can be defined here
  };
  return Product;
};
