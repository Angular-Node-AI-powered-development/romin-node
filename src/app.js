const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./modules/health/health.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/health', healthRoutes);

const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

app.use(errorHandler);

module.exports = app;
