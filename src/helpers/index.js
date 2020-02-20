const bcrypt = require('bcryptjs');
// import environmental variables from our variables.env file
require('dotenv').config({
  path: '../../variables.env',
});

exports.hashString = async (str) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);

  return hash;
};


exports.compareHash = async (str, hashString) => {
  const result = await bcrypt.compare(str, hashString);
  return result;
};

exports.envVariables = {
  secretOrKey: process.env.SECRETORKEY,
  devDB: process.env.DATABASE_URL,
  testDB: process.env.TEST_DATABASE_URL,
  prodDB: process.env.DATABASE_URL,
  dialect: process.env.DIALECT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dbname: process.env.DBNAME,
  host: process.env.HOST,
  port: process.env.DBPORT,
  testDbname: process.env.TESTDBNAME,
  cloudname: process.env.CLOUD_NAME,
  apikey: process.env.API_KEY,
  apisecret: process.env.API_SECRET,
  node_env: process.env.NODE_ENV,
};
