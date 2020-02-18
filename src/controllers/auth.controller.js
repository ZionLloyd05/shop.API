const jwt = require('jsonwebtoken');
const models = require('../database/models');
const utility = require('../helpers');
const { envVariables } = require('../helpers');

exports.checkIfAccountExist = async (userEmail) => {
  console.log(userEmail);
  const userInDb = await models.User.findOne({
    where: { email: userEmail },
  });
  return userInDb;
};

exports.login = async (user, password) => {
  const isPasswordValid = await utility.compareHash(password, user.password);

  if (!isPasswordValid) {
    return false;
  }

  // Preapring JsonWebToken
  // -- Create payload
  const username = `${user.firstname} ${user.lastname}`;
  const payload = {
    id: user.id,
    username,
    isadmin: user.isAdmin,
  };

  // --- Sign the token
  try {
    const token = await jwt.sign(payload, envVariables.secretOrKey, { expiresIn: 3600 });
    const userToken = `Bearer ${token}`;
    return userToken;
  } catch (error) {
    return error;
  }
};
