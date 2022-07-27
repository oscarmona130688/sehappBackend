const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comentariosSchema = new Schema({

    descripcion: { type: String, required: [true, 'La descripcion es obligatoria'] },
    calificacion: { type: Number, required: [true, 'la calificacion es requerido'] },
    servicio: { type: Schema.Types.ObjectId, ref: 'servicios', required: true },
});

module.exports = mongoose.model('comentarios', comentariosSchema);