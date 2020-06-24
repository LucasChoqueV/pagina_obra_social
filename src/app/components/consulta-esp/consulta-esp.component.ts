import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/service/consulta.service';
import { ToastrService } from 'ngx-toastr';
import { EspecialistaService } from 'src/app/service/especialista.service';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-consulta-esp',
  templateUrl: './consulta-esp.component.html',
  styleUrls: ['./consulta-esp.component.css']
})
export class ConsultaEspComponent implements OnInit {

  consulta: Consulta;
  consultas: Array<Consulta>;
  fechaC: Date = null;
  linkC: string;
  motivoRechazo: string;

  constructor(private consultaService: ConsultaService, private toastr: ToastrService, public espService: EspecialistaService) { 
    this.consulta = new Consulta();
    this.consultas = new Array<Consulta>();
    this.consulta.matricula = this.espService.espLogged.matricula;
    this.consulta.nombreMedico = this.espService.espLogged.nombre; 
    this.refrescarConsultas();
  }

  ngOnInit(): void {
  }

  refrescarConsultas(){
    this.consultas = new Array<Consulta>();
    this.consultaService.getConsultasByEsp(this.consulta.matricula).subscribe(
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

  public confirmarConsulta(){
    this.consulta.link = this.linkC;
    this.consulta.fecha = this.fechaC;
    this.consulta.motivoRechazo = this.motivoRechazo;
    this.consulta.estado = "CONFIRMADA";
    this.consultaService.cantNotificaciones -= 1;
    this.consulta.motivoRechazo = "-";
    this.consultaService.updateConsulta(this.consulta).subscribe(
      (result)=>{
        this.toastr.info("Consulta Actualizada");
        this.refrescarConsultas();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.consulta = new Consulta();
    this.consulta.matricula = this.espService.espLogged.matricula;
    this.consulta.nombreMedico = this.espService.espLogged.nombre; 
  }

  public rechazarConsulta(){
    this.consulta.estado = "CANCELADA";
    this.consultaService.cantNotificaciones -= 1;
    this.consultaService.updateConsulta(this.consulta).subscribe(
      (result)=>{
        this.toastr.info("Consulta Rechazada");
        this.refrescarConsultas();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.consulta = new Consulta();
    this.consulta.matricula = this.espService.espLogged.matricula;
    this.consulta.nombreMedico = this.espService.espLogged.nombre; 
  }

  cargarConsulta(consulta: Consulta){
    this.consulta = consulta;
  }
}
