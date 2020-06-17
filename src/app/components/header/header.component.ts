import { Component, OnInit } from '@angular/core';
import { PacienteService } from './../../service/paciente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public pacienteService:PacienteService) { }

  logout(){
    this.pacienteService.logout();
  }
  ngOnInit(): void {
  }

}
