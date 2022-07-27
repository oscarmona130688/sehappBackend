const express = require('express');
const Comentario = require('../modelos/comentarios');

const app = express();

app.use(express.json());

//consultar comentarios por servicio
app.get('/comentariosser/:servicio', (req, res) => {
    let servicio = req.params.servicio

    Comentario.find({ servicio: servicio })

        .exec((err, comentarios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                comentarios
            });
        });
});

app.get('/comentarios/:_id', (req, res) => {
    let _id = req.params._id

    Comentario.find({ _id: _id })

        .exec((err, comentarios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                comentarios
            });
        });
});

app.get('/comentarios', (req, res) => {
    Comentario.find({})

        .exec((err, comentarios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                comentarios
            });
        });
});


app.post('/comentarios', (req, res) => {
    let body = req.body;

    let comentarios = new Comentario({
        descripcion: body.descripcion,
        calificacion: body.calificacion,
        servicio: body.servicio,

    });

    comentarios.save((error, comentarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: comentarioDB
        });
    });
});

app.put('/comentarios/:_id', (req, res) => {
    let _id = req.params._id
    let body = req.body

    Comentario.findByIdAndUpdate(_id, body, { new: true }, (error, comentarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: comentarioDB
        });
    });

});

app.delete('/comentarios/:_id', (req, res) => {
    let _id = req.params._id
    Comentario.findByIdAndDelete(_id, (error, comentarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: console.log("El registro se ha eliminado correctamente")
        });
    });
});

module.exports = app;