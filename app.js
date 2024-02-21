const express = require('express');
const conn = require('./connection/db');
const tourRouter = require('./routes/tourRouter')

const app = express();

app.use(express.json());

app.use("/api/v1/tours",tourRouter);
module.exports = app;