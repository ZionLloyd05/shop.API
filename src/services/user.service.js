const userController = require('../controllers/user.controller');
// const IsEmpty = require('../helpers/isEmpty');

exports.getAllUsers = async () => {
  const users = await userController.getUsers();

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: users },
    statusCode,
  };
  return result;
};

exports.getUserById = async (userId) => {
  const user = await userController.getUserById(userId);

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: user },
    statusCode,
  };
  return result;
};
