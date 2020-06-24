import { Component, OnInit } from '@angular/core';
import { PacienteService } from './../../service/paciente.service';
import { EspecialistaService } from 'src/app/service/especialista.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreActual: string;
  /* cantNotificaciones: number = 0;
  notificaciones: Array<Consulta>; */

  constructor(public pacienteService:PacienteService, public espService: EspecialistaService, public userService: UsuarioService, public consultaService: ConsultaService) {
   
  }

  logout(){
    this.pacienteService.logout();
    this.userService.logout();
    this.espService.logout();
    this.consultaService.cantNotificaciones = 0;
    this.consultaService.notificaciones = new Array<Consulta>(); 
  }

  
  ngOnInit(): void {
    
  }

  /* calcularNotificaciones(){
    this.notificaciones = new Array<Consulta>();
    if(this.espService.espLogged != null){
      this.consultaService.getConsultasByEsp(this.espService.espLogged.matricula).subscribe(
        (result)=>{
          var consult: Consulta = new Consulta();
          result.forEach(element => {
            Object.assign(consult, element);
            this.notificaciones.push(consult);
            consult = new Consulta();
          });
        },
        (error)=>{
          console.log(error);
        }
      )
    }else{
      if(this.pacienteService.pacienteLogged != null){
        this.consultaService.getConsultasByPac(this.pacienteService.pacienteLogged.dni).subscribe(
          (result)=>{
            var consult: Consulta = new Consulta();
            result.forEach(element => {
              Object.assign(consult, element);
              this.notificaciones.push(consult);
              consult = new Consulta();
            });
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    }
  }

  calcularCantidadNot(){
    for(var i= 0; i< this.notificaciones.length; i++){
      if(this.notificaciones[i].estado == "PENDIENTE"){
        this.cantNotificaciones += 1;
      }
    }
  }
 */

}
