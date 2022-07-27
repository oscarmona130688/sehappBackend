const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fotosSchema = new Schema({

    foto: { type: Object, required: false },
    servicio: { type: Schema.Types.ObjectId, ref: 'servicios', required: true },
});

module.exports = mongoose.model('fotos', fotosSchema);