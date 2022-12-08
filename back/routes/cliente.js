'use strict'

var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();
//rutas de accesos
api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);

api.get('/listar_cientes_filtro_admin', clienteController.listar_clientes_fitro_dmin);


module.exports = api;