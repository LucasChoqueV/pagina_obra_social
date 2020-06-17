const Paciente = require('../models/paciente');

const pacienteCtrl = {}

pacienteCtrl.getPacientes = async (req, res) => {
    pacientes = await Paciente.find();
    res.json(pacientes);
}

pacienteCtrl.createPaciente = async (req, res) => {
    console.log("entro create paciente");
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.json({
        'status': 'Paciente saved'
    });
}

module.exports = pacienteCtrl;