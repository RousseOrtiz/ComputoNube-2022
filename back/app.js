'use strict'

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');

mongoose .connect('mongodb+srv://usr1:usr1@cluster0.ckidho3.mongodb.net/Tienda',{useUnifiedTopology: true, useNewUrlParser: true}, (err, res)=>{
    if(err){
        console.log(err);
    }else{
        
        app.listen(port,function(){
        console.log('Servidor Corriendo en el puerto ' + port);    
        });
    }
});
//parciar y configurar data para mandar del front al back
app.use(bodyparser.urlencoded({extended:true})); //para analizar los cuerpos de las peticiones
app.use(bodyparser.json({limit: '50mb',extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_route);
app.use('/api',admin_route);

module.exports = app;