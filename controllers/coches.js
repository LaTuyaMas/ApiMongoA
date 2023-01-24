'use strict'

var cochesModel = require('../models/coches.js');

function obtenerCoche(req, res) {
    var cocheId = req.params.id;

    cochesModel.findById(cocheId, function (err, coche) {
        if (err) {
            res.status(500).send({message: 'Error interno al consultar el find del coche indicado'});
        } else {
            if (!coche) {
                res.status(404).send({message: 'El coche no existe'});
            } else {
                res.status(200).send({coche});
            }
        }
    });
}

function obtenerCoches(req, res) {
    cochesModel.find({}).sort('-id').exec((err,coches)  => {
        if (err) {
            res.status(500).send({message: "Se ha producido un error interno en el sistema"});
        } else {
            if (!coches) {
                res.status(404).send({message: 'No hay coches dados de alta en el sistema'});
            } else {
                res.status(200).send({coches});
            }
        }
    });

}

function insertarCoche(req, res) {
    var coche = new cochesModel();
    var params = req.body;

    coche.matricula = params.matricula;
    coche.marca = params.marca;
    coche.modelo = params.modelo;
    coche.potencia = params.potencia;

    coche.save((err, cocheGuardado) => {
        if (err) {
            res.status(500).send({message: 'Error interno al guardar el coche'});
        }  else {
            res.status(200).send({coche: cocheGuardado});
        }
    });
}

function actualizarCoche(req, res) {
    var cocheId = req.params.id;
    var update = req.body;

    cochesModel.findByIdAndUpdate(cocheId, update, (err, cocheActualizado) => {
        if (err) {
            res.status(500).send({message: err});
        }
        else {
            if (!cocheActualizado) {
                res.status(404).send({message: "No se ha podido encontrar el coche"});
            }
            else {
                res.status(200).send({cocheActualizado});
            }
        }
    });
}

function borrarCoche(req, res) {
    var cocheId = req.params.id;

    cochesModel.findById(cocheId, function (err, coche){
        if (err) {
            res.status(500).send({message: err});
        }
        else {
            if (!coche) {
                res.status(404).send({message: "No se ha podido encontrar el coche"});
            }
            else {
                coche.remove(err => {
                    if (err){
                        res.status(500).send({message: "Error interno del servidor"});
                    }
                    else {
                        res.status(200).send({message: "Coche borrado con éxito"});
                    }
                });
            }
        }
    });
}

function filtrarCochesPorPotencia(req, res) {
    var potencia = req.params.potencia;

    cochesModel.find({potencia: {$gt: potenciaMayor}}).sort("-id").exec((err, coches) => {
        if (err) {
            res.status(500).send({message: "Error interno del servidor"});
        }
        else {
            if (!coches) {
                res.status(404).send({message: "No existen coches que cumplan con el filtro"});
            }
            else {
                res.status(200).send(coches)
            }
        }
    });
}

module.exports = {
    obtenerCoche,
    obtenerCoches,
    insertarCoche,
    actualizarCoche,
    borrarCoche,
    filtrarCochesPorPotencia
}

