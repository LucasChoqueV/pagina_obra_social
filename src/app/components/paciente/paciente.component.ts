import { Component, OnInit } from '@angular/core';
import { PacienteService } from './../../service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  constructor(private service:PacienteService) {
    
   }

  getPacientes(){
    this.service.getPacientes().subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
