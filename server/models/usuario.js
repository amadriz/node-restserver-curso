//IMPORTAR MONGOOSE
const mongoose = require('mongoose');

//PARA VALIDACIONES PERSONALISADAS
var uniqueValidator = require('mongoose-unique-validator');

//PARA CREAR SCHEMAS MONGO - MODELO DE USUARIO
let Schema = mongoose.Schema;

//PARA LOS ROLES DEL USUARIO
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false

    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    }
});

//Para ocultar campo de contraseña
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject

}

//Validacion email
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);