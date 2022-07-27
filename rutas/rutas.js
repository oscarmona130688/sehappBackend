const express = require('express');

const app = express();

app.use(require('./servicios'));
app.use(require('./usuarios'));
app.use(require('./comentarios'));
app.use(require('./fotos'));

module.exports = app;