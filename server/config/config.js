//Objeto global que siempre esta corriendo en la aplicacion

// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
//Si la variable no existe supone que estoy en dev (desarrollo)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del token 30 dias
// ============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  SEED  DE AUTENTICACION 
// ============================ 
//Crear variable en heroku que sera el seed (seguridad para que no se vea en gitlab)
process.env.SEED = process.env.SEED || 'este - es - el - seed - desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;