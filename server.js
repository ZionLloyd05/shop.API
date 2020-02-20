const express = require('express');

const morgan = require('morgan');

const passport = require('passport');

const bodyParser = require('body-parser');

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');

// import environmental variables from our variables.env file
require('dotenv').config({
  path: 'variables.env',
});

const appRouter = require('./src/routes/api');

const app = express();

/**
 * Configuring middlewares
 */
// ==> body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==> passprt config
app.use(passport.initialize());

// ==> Swagger Config
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mock Shop API',
      description: 'Mock Shop API Documentation',
      version: '1.0',
      contact: {
        name: 'Alagbala Damilola',
        email: 'alagbaladamilola@gmail.com',
      },
      servers: ['http://localhost:5000'],
    },
  },

  apis: ['./src/routes/api/v1.0/*js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


require('./src/helpers/passport')(passport);
//

/**
 * For request endpoint loggging
 */
app.use(morgan('dev'));

/**
 * Application health check
 */
app.get('/api/healthcheck', (req, res) => res.send('Healthy'));

/**
 * Configuring overall application route
 */
app.use('/api', appRouter);

const port = process.env.PORT || 5000;
// const envConfigs = require('./src/database/config/config');

// const env = process.env.NODE_ENV;
// const config = envConfigs.development;
// console.log(config);
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
