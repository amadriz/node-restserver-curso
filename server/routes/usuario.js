const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario', function(req, res) {


    // Variable para skip || 0 es igual a la pagina 1
    let desde = req.query.desde || 0;
    //esto pasa de formato String a número
    desde = Number(desde);
    // Variable Limite de usuarios en la tabla 5 registros
    let limite = req.query.limite || 5;
    limite = Number(limite);
    //El find regresa todos los usuarios activos {estado: true}    //con esto incluimos campos que interesan y se excluyen los que no.
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        //Skip se utiliza para paginacion solo presenta un numero especifico de registros.
        .skip(desde)
        .limit(limite)
        //Execute recive un error o array de usuarios
        .exec((err, usuarios) => {

            if (err) {
                //mensaje de error
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //respuesta (resp) cuenta y muestra la cantidad de usuarios activos
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });


});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});
// Elimina REGISTROS solo cambia el estado a false para que no se vea; no borrarlo del todo.
app.delete('/usuario/:id', function(req, res) {

    //Para obtener el id
    let id = req.params.id;
    // Esta direccion si la borra del todo
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});



module.exports = app;