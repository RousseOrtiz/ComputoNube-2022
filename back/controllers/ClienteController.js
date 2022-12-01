'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs'); //encriptar contraseña

const registro_cliente  = async function(req,res){
    //
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email}); //para verificar los correos
//Registro de usuario
    if(clientes_arr.length == 0){
        
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash; //nuevo valor de la contraseñ encriptada
                    var registro = await Cliente.create(data);
                    res.status(200).send({data:registro});
                }else{
                    res.status(200).send({message: 'ErrorServer',data:undefined});
                }
            })
        }else{
            res.status(200).send({message: 'No exixte ninguna contraseña',data:undefined});
        }

        
    }else{
        res.status(200).send({message: 'Correo existente en la base de datos, intente con otro',data:undefined});
    }   
}

module.exports = {
    registro_cliente
}