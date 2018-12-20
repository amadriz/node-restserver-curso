//=================
//Importar libreria de JWT para validar token
//=================
const jwt = require('jsonwebtoken');

//FUNCION (Middleware) PARA VERIFICAR EL TOKEN
// ================

let verificaToken = (req, res, next) => {
    //Recibo el token
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
    });
    //Que quiero hacer con el token
    next();


};

//FUNCION (Middleware) PARA VERIFICAR ADMIN ROLE
// ================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    //SOLO USAUARIO CON ROL ADMINISTRATIVO
    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {


        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}




module.exports = {
    verificaToken,
    verificaAdmin_Role
}