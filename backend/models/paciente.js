const mongoose = require('mongoose');

const {Schema} = mongoose;

const PacienteSchema = new Schema({
    apellido: {type: String, required: true},
    nombre: {type: String, required: true},
    dni: {type: Number, required: true},
    contrasena: {type: String, required: true},
    direccion: {type: String, required: true},
    telefono: {type: String, required: true},
    email: {type: String, required: true},
    fechaNacimiento: {type: Date, required: true},
    perfil: {type: String, required: true}
})


module.exports = mongoose.model('Paciente', PacienteSchema);