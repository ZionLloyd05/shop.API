const express = require('express');

const morgan = require('morgan');

const appRouter = require('./src/routes/api');

const app = express();

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
