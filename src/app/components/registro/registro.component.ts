import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from './../../service/paciente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  pacienteNuevo:Paciente;
  listPacientes:Array<Paciente>;

  confirmarContrasena:string="";
  confirmarEmail:string="";
  
  termino:boolean;
  varValidarContrasena:boolean=false;
  varValidarEmail:boolean=false;
  varValidarDni:boolean=false;
  varValidarEmailRepetido:boolean=false;
  constructor(private service:PacienteService, private toastr:ToastrService) {
    this.pacienteNuevo = new Paciente();
    this.listPacientes = new Array<Paciente>();
    this.getPacientes();
  }

  getPacientes(){
    this.service.getPacientes().subscribe(
      (result) => {
        result.forEach(element => {
          Object.assign(this.pacienteNuevo, element);
          this.listPacientes.push(this.pacienteNuevo);
          this.pacienteNuevo = new Paciente();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  validarDni(){
    var pacienteAuxiliar = new Paciente();
    pacienteAuxiliar = this.listPacientes.find(element => element.dni == this.pacienteNuevo.dni);
    if(pacienteAuxiliar == null)
      this.varValidarDni = false;
    else
      this.varValidarDni = true;
  }

  validarEmailRepetido(){
    var pacienteAuxiliar = new Paciente();
    pacienteAuxiliar = this.listPacientes.find(element => element.email == this.pacienteNuevo.email);
    if(pacienteAuxiliar == null)
      this.varValidarEmailRepetido = false;
    else
      this.varValidarEmailRepetido = true;
  }

  validarContrasena(){
    if(this.pacienteNuevo.contrasena == this.confirmarContrasena)
      this.varValidarContrasena = true;
    else
      this.varValidarContrasena = false;
  }
  validarEmail(){
    if(this.pacienteNuevo.email == this.confirmarEmail)
      this.varValidarEmail = true;
    else
      this.varValidarEmail = false;

    this.validarEmailRepetido();
  }

  createPaciente(){
    console.log(this.pacienteNuevo);
    this.pacienteNuevo.perfil="Paciente";
    this.service.createPacientes(this.pacienteNuevo).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success("Su cuenta fue creada", "Exito");
      },
      (error) => {
        console.log(error);
      }
    )
    this.pacienteNuevo = new Paciente();
  }

  ngOnInit(): void {
  }

}
