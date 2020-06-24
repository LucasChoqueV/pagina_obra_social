import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteLoggedIn: boolean = false;
  pacienteLogged: Paciente;
  urlBase: string = "http://localhost:3000/api/pacientes/";

  constructor(private _http: HttpClient, private cookies: CookieService) { }

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

  deletePaciente(paciente: Paciente):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + paciente._id , httpOptions );
  }

  updatePaciente(paciente: Paciente):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(paciente);
    return this._http.put(this.urlBase + paciente._id , body , httpOptions );    

  }

  public logout() {
    this.pacienteLogged = new Paciente();
    this.pacienteLoggedIn = false;
  }


}