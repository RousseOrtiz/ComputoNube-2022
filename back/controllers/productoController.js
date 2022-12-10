'use strict'

var producto = require('../models/producto');

const registro_producto_admin = async function(res,req){
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
            console.log(data);
            console.log(req.file);
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }

}

module.exports = {
    registro_producto_admin
}