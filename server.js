const express = require('express');

const app = express();

app.get('/healthcheck', (req, res) => res.send('Healthy'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
