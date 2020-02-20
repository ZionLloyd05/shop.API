const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

exports.register = async (userToCreate) => {
  // check if account already exist
  const { email } = userToCreate;
  const user = await authController.checkIfAccountExist(email);

  if (user) {
    const statusCode = 409;
    const result = {
      toReturn: { status: 'error', data: 'User already exist' },
      statusCode,
    };
    return result;
  }

  const newUser = await userController.createNewUser(userToCreate);
  const statusCode = 201;
  const result = {
    toReturn: { status: 'success', data: newUser },
    statusCode,
  };
  return result;
};

exports.login = async (email, password) => {
  const user = await authController.checkIfAccountExist(email);

  if (user === null) {
    const statusCode = 404;
    const result = {
      toReturn: { status: 'error', data: 'User does not exist' },
      statusCode,
    };
    return result;
  }

  const userAuthToken = await authController.login(user, password);
  console.log(userAuthToken);
  if (!userAuthToken) {
    console.log('it here');
    const statusCode = 404;
    const result = {
      toReturn: { status: 'error', data: 'User does not exist' },
      statusCode,
    };
    return result;
  }

  const statusCode = 200;
  const result = {
    toReturn: { status: 'success', data: userAuthToken },
    statusCode,
  };
  return result;
};
