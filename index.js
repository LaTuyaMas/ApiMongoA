'use strict'

var mongoose = require('mongoose');
var app = require('./app');

mongoose.connect('mongodb+srv://progresa:progresa@cluster0.dscasnc.mongodb.net/concesionario', (err,res) =>
{
    if (err){
        throw err;
    }
    else{
        console.log('Conexión con la base de datos correcta');
        app.listen(3678, function (){
            console.log('API REST CONCESIONARIO ESCUCHANDO PETICIONES EN PUERTO 3678');
        });
    }
});