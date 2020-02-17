module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.CartItem, {
      foriegnKey: 'userId',
      as: 'cartItems',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
