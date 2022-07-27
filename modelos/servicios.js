const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es obligatorio'] },
    descripcion: { type: String, required: [true, 'la descripcion es obligatorio'] },
    categoria: { type: String, required: [true, 'La categoria es obligatoria'] },
    ciudad: { type: String, required: [true, 'La ciudad es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
});

module.exports = mongoose.model('servicios', serviciosSchema);