const { envVariables } = require('../../helpers');

const {
  devDB,
  testDB,
  testDbname,
  dialect,
  username,
  password,
  dbname,
  host,
  port,
} = envVariables;

module.exports = {
  development: {
    url: devDB,
    dialect,
    username,
    password,
    database: dbname,
    host,
    port,
  },
  test: {
    url: testDB,
    dialect,
    username,
    password,
    database: testDbname,
    host,
    port,
  },
  production: {
    url: prodDB,
    dialect,
    username,
    password,
    database: dbname,
    host,
    port,
  },
  },
};
