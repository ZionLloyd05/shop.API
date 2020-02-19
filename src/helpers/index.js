const bcrypt = require('bcryptjs');

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
  devDB: process.env.DEV_DATABASE_URL,
  testDB: process.env.TEST_DATABASE_URL,
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
};
