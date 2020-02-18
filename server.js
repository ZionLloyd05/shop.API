const express = require('express');

const morgan = require('morgan');

const passport = require('passport');

const bodyParser = require('body-parser');

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

app.listen(port, () => console.log(`Server running on port ${port}`));
