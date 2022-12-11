'use strict'

var express = require('express');
var productoController = require('../controllers/productoController');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/productos'});
//rutas de accesos

api.post('/registro_producto_admin', [auth.auth,path], productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?',auth.auth,productoController.listar_productos_admin);
api.get('/obtener_portada/:img',productoController.obtener_portada);

module.exports = api;