const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del usuario es obligatorio'] },
    correo: { type: String, unique: true, required: [true, 'el correo es obligatorio'] },
    contrasena: { type: String, required: [true, 'la contraseña es obligatorio'] },
    telefono: { type: Number, required: [true, 'El número de celular es requerido'] },
});

module.exports = mongoose.model('usuarios', usuariosSchema);