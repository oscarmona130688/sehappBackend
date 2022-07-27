const express = require('express');
const Usuario = require('../modelos/usuarios');

const app = express();

app.use(express.json());

app.get('/usuarios/:_id', (req, res) => {
    let _id = req.params._id

    Usuario.find({ _id: _id })

        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                usuarios
            });
        });
});

app.get('/usuarios', (req, res) => {
    Usuario.find({})

        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                usuarios
            });
        });
});


app.post('/usuarios', (req, res) => {
    let body = req.body;

    let usuarios = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        contrasena: body.contrasena,
        telefono: body.telefono,

    });

    usuarios.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: usuarioDB
        });
    });
});

app.put('/usuarios/:_id', (req, res) => {
    let _id = req.params._id
    let body = req.body

    Usuario.findByIdAndUpdate(_id, body, { new: true }, (error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: usuarioDB
        });
    });

});

app.delete('/usuarios/:_id', (req, res) => {
    let _id = req.params._id
    Usuario.findByIdAndDelete(_id, (error, usuarioDB) => {
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