//Objeto global que siempre esta corriendo en la aplicacion


//====================
//PUERTO
//====================

process.env.PORT = process.env.PORT || 3000;

//====================
//ENTORNO
//====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//====================
//BASE DE DATOS
//====================

let urlDB;

if (process.env.PORT === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'cafe-user:Abc123@ds147668.mlab.com:47668/cafe';
}

process.env.URLDB = urlDB;

//LOCAL
//mongodb://localhost:27017/cafe

//Mlab hosting
//mongodb://<dbuser>:<dbpassword>@ds147668.mlab.com:47668/cafe