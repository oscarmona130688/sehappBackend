const express = require('express');
const multer = require('multer');
const Foto = require('../modelos/fotos');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })
app.use(express.json());

//consultar comentarios por servicio
app.get('/fotosser/:servicio', (req, res) => {
    let servicio = req.params.servicio

    Foto.find({ servicio: servicio })

        .exec((err, fotos) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                fotos
            });
        });
});

app.get('/fotos/:_id', (req, res) => {
    let _id = req.params._id

    Foto.find({ _id: _id })

        .exec((err, fotos) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                fotos
            });
        });
});

app.get('/fotos', (req, res) => {
    Foto.find({})

        .exec((err, fotos) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }

            res.json({
                fotos
            });
        });
});


app.post('/fotos', upload.single('foto'), (req, res, next) => {
    let body = req.body;

    let fotos = new Foto({

        foto: req.file,
        servicio: body.servicio,

    });

    fotos.save((error, fotosDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: fotosDB
        });
    });

});

app.put('/fotos/:_id', (req, res) => {
    let _id = req.params._id
    let body = req.body

    Foto.findByIdAndUpdate(_id, body, { new: true }, (error, fotosDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            resp: fotosDB
        });
    });

});

app.delete('/fotos/:_id', (req, res) => {
    let _id = req.params._id
    Foto.findByIdAndDelete(_id, (error, fotosDB) => {
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