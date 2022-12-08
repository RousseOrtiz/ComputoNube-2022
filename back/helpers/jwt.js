//generacion de token
'use strict'

var jwt = require('jwt-simple'); //para decodificar tokens
var moment = require('moment');
var secret = 'rousseort';  //contraseña para encriptar datos

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(), //fecha que se creo el token
        exp: moment().add(7,'days').unix() //fecha expiracion del token
    }

    return jwt.encode(payload,secret);
}