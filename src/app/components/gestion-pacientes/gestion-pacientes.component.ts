import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-gestion-pacientes',
  templateUrl: './gestion-pacientes.component.html',
  styleUrls: ['./gestion-pacientes.component.css']
})
export class GestionPacientesComponent implements OnInit {

  paciente: Paciente;
  pacienteBorrar: Paciente;
  pacientes: Array<Paciente>;

  btnGuardar: Boolean = true;
  btnModificar: Boolean = false;

  constructor(private pacienteService: PacienteService, private toastr: ToastrService) { 
    this.pacienteBorrar = new Paciente();
    this.paciente = new Paciente();
    this.pacientes = new Array<Paciente>();
    this.refrescarPacientes();
  }

  ngOnInit(): void {
  }

  //registra las respuestas del asistente
  public registrarPaciente(){  
    this.pacienteService.createPacientes(this.paciente).subscribe(
      (result)=>{
        this.toastr.info("Paciente Agregado");
        this.refrescarPacientes();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.paciente = new Paciente();
  }

  refrescarPacientes(){
    this.pacientes = new Array<Paciente>();
    this.pacienteService.getPacientes().subscribe(
      (result)=>{
        var asist: Paciente = new Paciente();
        result.forEach(element => {
          Object.assign(asist, element);
          this.pacientes.push(asist);
          asist = new Paciente();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  elegirPaciente(paciente: Paciente){
    var vAsist = new Paciente();
    Object.assign(vAsist,paciente);
    this.paciente = vAsist;
    this.btnGuardar = false;
    this.btnModificar = true;
  }

  borrarPaciente(){
    this.pacienteService.deletePaciente(this.pacienteBorrar).subscribe(
      (result)=>{
        this.toastr.info("Paciente borrado.");
        this.pacienteBorrar = new Paciente();
        this.refrescarPacientes();
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  limpiarPaciente(){
    this.paciente = new Paciente();
  }

  cancelarModificacion(){
    this.paciente = new Paciente();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  modificarPaciente(){
    
    this.pacienteService.updatePaciente(this.paciente).subscribe(
      (result)=>{
        this.toastr.info("Paciente Modificado.");
        this.refrescarPacientes();
      },
      (error)=>{
        console.log(error);
      }
    );
    this.paciente = new Paciente();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  public cargarPacienteModal(paciente: Paciente){
    this.pacienteBorrar = paciente;
  }

}
