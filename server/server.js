require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// INICIAR EXPRESS
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// CONFIGURACION GLOBAL DE RUTAS
app.use(require('./routes/index'));



//Para conectar a base de datos mongo
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});