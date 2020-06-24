import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from './../../service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona';
import { EspecialistaService } from 'src/app/service/especialista.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Especialista } from 'src/app/models/especialista';
import { ConsultaService } from 'src/app/service/consulta.service';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listPaciente: Array<Paciente>;
  listEspecialista: Array<Especialista>;
  listAdmins: Array<Persona>;

  usuarioBuscado: Persona;
  usuarioEncontrado: Persona;
  espEncontrado: Especialista;
  pacEncontrado: Paciente;

  returnUrl: string;
  msglogin: string;

  constructor(public pacienteService: PacienteService, public espService: EspecialistaService, public userService: UsuarioService,private route: ActivatedRoute, private router:Router, private toastr:ToastrService, public consService: ConsultaService ) { 
    this.listPaciente = new Array<Paciente>();
    this.listAdmins = new Array<Persona>();
    this. listEspecialista = new Array<Especialista>();
    this.usuarioBuscado = new Persona();
    this.usuarioEncontrado = new Persona();
    this.espEncontrado = new Especialista();
    this.pacEncontrado = new Paciente();
    this.getPacientes(); this.getAdmins(); this.getEspecialistas();
  }

  getPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (result) => {
        for(var i=0; i<result.length;i++)
          this.listPaciente.push(result[i]);
      }
    )
  }
  getEspecialistas() {
    this.espService.getEspecialistas().subscribe(
      (result) => {
        for(var i=0; i<result.length;i++)
          this.listEspecialista.push(result[i]);
      }
    )
  }
  getAdmins() {
    this.userService.getUsers().subscribe(
      (result) => {
        for(var i=0; i<result.length;i++)
          this.listAdmins.push(result[i]);
      }
    )
  }

  login(){
    this.pacEncontrado = this.listPaciente.find(element => (element.dni == this.usuarioBuscado.dni) && (element.contrasena == this.usuarioBuscado.contrasena));
    this.espEncontrado = this.listEspecialista.find(element => (element.dni == this.usuarioBuscado.dni) && (element.contrasena == this.usuarioBuscado.contrasena));
    this.usuarioEncontrado = this.listAdmins.find(element => (element.dni == this.usuarioBuscado.dni) && (element.contrasena == this.usuarioBuscado.contrasena));
    
    if(this.pacEncontrado != null || this.espEncontrado != null || this.usuarioEncontrado != null){
      if(this.pacEncontrado != null ){
        this.pacienteService.pacienteLoggedIn=true;
        this.pacienteService.pacienteLogged=this.pacEncontrado;
      }
      if(this.espEncontrado != null){
        this.espService.espLoggedIn=true;
        this.espService.espLogged=this.espEncontrado;
      }
      if(this.usuarioEncontrado != null){
        this.userService.userLoggedIn=true;
        this.userService.userLogged=this.usuarioEncontrado;
      }
      this.calcularNotificaciones();
    }
    else
      this.toastr.error("El DNI y/o contraseña no coinciden","Error de validacion")
  }


  calcularNotificaciones(){
    this.consService.notificaciones = new Array<Consulta>();
    if(this.espService.espLoggedIn == true){
      this.consService.getConsultasByEsp(this.espService.espLogged.matricula).subscribe(
        (result)=>{
          var consult: Consulta = new Consulta();
          console.log("entrooo");
          console.log(this.espService.espLogged.matricula)
          result.forEach(element => {
            Object.assign(consult, element);
            this.consService.notificaciones.push(consult);
            consult = new Consulta();
          });
          this.calcularCantidadNot("PENDIENTE");
        },
        (error)=>{
          console.log(error);
        }
      )
    }else{
      if(this.pacienteService.pacienteLoggedIn == true){
        this.consService.getConsultasByPac(this.pacienteService.pacienteLogged.dni).subscribe(
          (result)=>{
            var consult: Consulta = new Consulta();
            result.forEach(element => {
              Object.assign(consult, element);
              this.consService.notificaciones.push(consult);
              consult = new Consulta();
            });
            this.calcularCantidadNot("CONFIRMADA");
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    }
  }

  calcularCantidadNot(tipo: string){
    for(var i= 0; i< this.consService.notificaciones.length; i++){
      if(this.consService.notificaciones[i].estado == tipo){
        this.consService.cantNotificaciones += 1;
      }
    }
    this.router.navigateByUrl(this.returnUrl);
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

}
