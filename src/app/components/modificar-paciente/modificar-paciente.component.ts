import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css']
})
export class ModificarPacienteComponent implements OnInit {

  pacienteModificar:Paciente;
  constructor(public serPaciente:PacienteService, private toastr:ToastrService) {
    this.pacienteModificar = new Paciente();
    this.cargarPacienteActual();
  }

  guardarPaciente(){
    console.log("Paciente a guardar:");
    console.log(this.pacienteModificar);
    this.serPaciente.updatePaciente(this.pacienteModificar).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info("Se han modificado sus datos","Modificado")
      },
      (error) => {
        console.log(error)
      }
    )
    this.serPaciente.pacienteLogged = this.pacienteModificar
  }

  cargarPacienteActual(){
    this.pacienteModificar.apellido = this.serPaciente.pacienteLogged.apellido;
    this.pacienteModificar._id = this.serPaciente.pacienteLogged._id;
    this.pacienteModificar.nombre = this.serPaciente.pacienteLogged.nombre;
    this.pacienteModificar.dni = this.serPaciente.pacienteLogged.dni;
    this.pacienteModificar.contrasena = this.serPaciente.pacienteLogged.contrasena;
    this.pacienteModificar.email = this.serPaciente.pacienteLogged.email;
    this.pacienteModificar.telefono = this.serPaciente.pacienteLogged.telefono;
    this.pacienteModificar.direccion = this.serPaciente.pacienteLogged.direccion;
    this.pacienteModificar.fechaNacimiento = this.serPaciente.pacienteLogged.fechaNacimiento;
    this.pacienteModificar.perfil = this.serPaciente.pacienteLogged.perfil;
  }


  ngOnInit(): void {
  }

}
