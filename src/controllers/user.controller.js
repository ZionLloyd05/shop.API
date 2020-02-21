
const models = require('../database/models');
const utility = require('../helpers');

exports.createNewUser = async (userToCreate) => {
  const {
    firstname, lastname, email, password,
  } = userToCreate;


  const hashedPassword = await utility.hashString(password);

  const newUserObj = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
    isAdmin: false,
  };

  const newUser = await models.User.create(newUserObj);
  return newUser;
};

exports.getUserById = async (userId) => {
  try {
    const user = await models.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return 'User not found';
    }

    return user;
  } catch (error) {
    console.log(error);
    return 'Something went wrong with the server and could not find user';
  }
};

exports.getUsers = async () => {
  const users = await models.User.findAll({});
  return users;
};
