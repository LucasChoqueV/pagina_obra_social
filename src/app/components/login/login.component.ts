import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from './../../service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listPaciente: Array<Paciente>;
  pacienteBuscado: Paciente;
  pacienteEncontrado: Paciente;
  returnUrl: string;
  msglogin: string;
  constructor(public pacienteService: PacienteService, private route: ActivatedRoute, private router:Router, private toastr:ToastrService ) { 
    this.listPaciente = new Array<Paciente>();
    this.pacienteBuscado = new Paciente();
    this.pacienteEncontrado = new Paciente();
    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (result) => {
        for(var i=0; i<result.length;i++)
          this.listPaciente.push(result[i]);
      }
    )
  }

  login(){
    this.pacienteEncontrado = this.listPaciente.find(element => (element.dni == this.pacienteBuscado.dni) && (element.contrasena == this.pacienteBuscado.contrasena))
    
    if(this.pacienteEncontrado != null){
      this.pacienteService.pacienteLoggedIn=true;
      this.pacienteService.pacienteLogged=this.pacienteEncontrado;
      this.router.navigateByUrl(this.returnUrl);
    }
    else
      this.toastr.error("El DNI y/o contraseña no coinciden","Error de validacion")
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

}
