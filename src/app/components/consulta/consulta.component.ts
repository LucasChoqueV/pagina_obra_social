import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/service/consulta.service';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/service/especialista.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consulta: Consulta;
  consultas: Array<Consulta>;
  especialistas: Array<Especialista>;
  especialista: Especialista;
  nombreEspecialidad: string;

  constructor(private consultaService: ConsultaService, private toastr: ToastrService, public pacienteService: PacienteService, public espService: EspecialistaService) { 
    this.consulta = new Consulta();
    this.consultas = new Array<Consulta>();
    this.especialistas = new Array<Especialista>();
    this.especialista = new Especialista();
    this.consulta.dniPaciente = this.pacienteService.pacienteLogged.dni;
    this.consulta.nombrePaciente = this.pacienteService.pacienteLogged.nombre; 
    this.refrescarConsultas();
    this.refrescarEspeciaistas();
  }

  ngOnInit(): void {
  }

  prepararConsulta(){
    this.espService.getEspecialista(this.especialista._id.toString()).subscribe(
      (result)=>{
        this.consulta.nombreMedico = result["nombre"];
        this.consulta.especialidad = result["especialidad"];
        this.consulta.matricula = result["matricula"];
        this.nombreEspecialidad = result["especialidad"];
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  public guardarConsulta(){
    this.consulta.estado = "PENDIENTE";
    this.consultaService.createConsulta(this.consulta).subscribe(
      (result)=>{
        this.toastr.info("Consulta Agregado");
        this.refrescarConsultas();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.consulta = new Consulta();
    this.especialista = new Especialista();
    this.consulta.dniPaciente = this.pacienteService.pacienteLogged.dni;
    this.consulta.nombrePaciente = this.pacienteService.pacienteLogged.nombre; 
  }

  refrescarConsultas(){
    this.consultas = new Array<Consulta>();
    console.log(this.consulta.dniPaciente);
    this.consultaService.getConsultasByPac(this.consulta.dniPaciente).subscribe(
      (result)=>{
        var consult: Consulta = new Consulta();
        result.forEach(element => {
          Object.assign(consult, element);
          this.consultas.push(consult);
          consult = new Consulta();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  refrescarEspeciaistas(){
    this.especialistas = new Array<Especialista>();
    this.espService.getEspecialistas().subscribe(
      (result)=>{
        var esp: Especialista = new Especialista();
        result.forEach(element => {
          Object.assign(esp, element);
          this.especialistas.push(esp);
          esp = new Especialista();
        });
      },
      (error)=>{
        console.log(error);
      }
    )    
  }

}
