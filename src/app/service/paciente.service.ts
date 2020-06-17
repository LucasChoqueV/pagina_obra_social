import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteLoggedIn: boolean = false;
  pacienteLogged: Paciente;
  urlBase: string = "http://localhost:3000/api/pacientes/";
  constructor(private _http: HttpClient) { }

  getPacientes(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }

    return this._http.get(this.urlBase, httpOptions);
  }

  createPacientes(pacienteNuevo: Paciente): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var body = JSON.stringify(pacienteNuevo);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  public logout() {
    this.pacienteLogged = new Paciente();
    this.pacienteLoggedIn = false;
  }
}