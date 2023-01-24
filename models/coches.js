'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cochesSchema = Schema({
    matricula: {
        type: String,
        required: true,
    },
    marca: String,
    modelo: String,
    potencia: Number,

});

module.exports = mongoose.model('coches', cochesSchema);