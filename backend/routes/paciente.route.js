console.log("cargo paciente.route");
//creamos un manejador de rutas modulars
const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const pacienteCtrl = require('./../controllers/paciente.controller');

// definiendo rutas
router.get('/', pacienteCtrl.getPacientes);
router.post('/', pacienteCtrl.createPaciente);

//exportacion del modulo de rutas
module.exports = router;