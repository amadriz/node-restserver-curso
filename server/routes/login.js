const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

//Iniciar express
const app = express();

app.post('/login', (req, res) => {
    // Body = para obtener el email y el password
    let body = req.body;
    //Me interesa regresar solo uno "findOne"
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            //mensaje de error
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        // Bcrypt hace true or false y compara contra password de la base de datos (usuarioDB,password)
        if (bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB //Para que el token expire en 30 dias
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token

        });
    });
});

module.exports = app;

//Se prueba en postman
//https://www.npmjs.com/package/jsonwebtoken para token