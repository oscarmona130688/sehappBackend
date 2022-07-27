const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
app.use(require('./rutas/rutas'));


mongoose.connect('mongodb+srv://admin:130688@cluster0.03v5w.mongodb.net/sehapp?retryWrites=true&w=majority', (err, res) => {
    if (err) throw err;
    console.log('Estamos conectados a la base de datos sehapp');
});

app.listen(3002, () => {
    console.log('Servidor arriba!')
});