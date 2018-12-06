require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    //Para enviar info en formato json
    res.json('get Usuario')
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {

        res.json({
            persona: body
        });
    }

});

app.put('/usuario', function(req, res) {
    //Para enviar info en formato json
    res.json('Put Usuario')
});

app.delete('/usuario', function(req, res) {
    //Para enviar info en formato json
    res.json('delete Usuario')
});

app.listen(3000, () => {
    console.log('escuchando puerto 3000');
})