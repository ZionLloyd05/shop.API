
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
    isAdmin: true,
  };

  const newUser = await models.User.create(newUserObj);
  return newUser;
};
  
exports.getUserById = async (userId) => {
  const user = await models.User.findOne({
    where: { id: userId }
  })

  return user;
}