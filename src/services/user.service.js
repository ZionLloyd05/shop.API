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
  const userReturn = await userController.getUserById(userId);

  if (typeof userReturn === 'string') {
    const error = userReturn;
    const statusCode = 404;
    return {
      toReturn: { status: 'error', data: error },
      statusCode,
    };
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: userReturn },
    statusCode,
  };
  return result;
};
