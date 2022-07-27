const express = require('express');
const Servicio = require('../modelos/servicios');

const app = express();

app.use(express.json());

//traer servicios por usuario
app.get('/serviciosusu/:usuario', (req, res) => {
    let usuario = req.params.usuario

    Servicio.find({ usuario: usuario })
        .populate('usuario')
        .exec((err, servicios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                servicios
            });
        });
});


//traer servicios por categoria
app.get('/servicioscat/:categoria', (req, res) => {
    let categoria = req.params.categoria

    Servicio.find({ categoria: categoria })
        .populate('usuario')
        .exec((err, servicios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                servicios
            });
        });
});


//traer servicios por ciudad
app.get('/serviciosciu/:ciudad', (req, res) => {
    let ciudad = req.params.ciudad

    Servicio.find({ ciudad: ciudad })
        .populate('usuario')
        .exec((err, servicios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                servicios
            });
        });
});

app.get('/servicios/:_id', (req, res) => {
    let _id = req.params._id

    Servicio.find({ _id: _id })
        .populate('usuario')
        .exec((err, servicios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                servicios
            });
        });
});

app.get('/servicios', (req, res) => {
    Servicio.find({})
        .populate('usuario')
        .exec((err, servicios) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                servicios
            });
        });
});


app.post('/servicios', (req, res) => {
    let body = req.body;

    let servicio = new Servicio({
        titulo: body.titulo,
        descripcion: body.descripcion,
        categoria: body.categoria,
        ciudad: body.ciudad,
        usuario: body.usuario,

    });

    servicio.save((error, servicioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: servicioDB
        });
    });
});

app.put('/servicios/:_id', (req, res) => {
    let _id = req.params._id
    let body = req.body

    Servicio.findByIdAndUpdate(_id, body, { new: true }, (error, servicioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: servicioDB
        });
    });

});

app.delete('/servicios/:_id', (req, res) => {
    let _id = req.params._id
    Servicio.findByIdAndDelete(_id, (error, servicioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: console.log("El archivo se ha eliminado correctamente")
        });
    });
});

module.exports = app;