const express = require('express');
const fs = require('fs'); 
const morgan = require('morgan');
const routes = require('./routes/routes'); 

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', routes);

module.exports = app;



