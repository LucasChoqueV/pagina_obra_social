import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  cantNotificaciones: number = 0;
  notificaciones: Array<Consulta> = new Array<Consulta>();

  urlBase: string = "http://localhost:3000/api/consultas/";

  constructor(private _http: HttpClient) { }


  public getConsultasByPac(dniPaciente: number):Observable<any> {
    const httpOption = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }
    let body = JSON.stringify({ dniPaciente: dniPaciente});
    return this._http.post(this.urlBase + "byPac" , body, httpOption);
    }

  public getConsultasByEsp(matricula: string):Observable<any> {
      const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      }
      let body = JSON.stringify({ matricula: matricula});
      return this._http.post(this.urlBase + "byEsp", body, httpOption);
  }


  createConsulta(consulta: Consulta): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var body = JSON.stringify(consulta);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  updateConsulta(consulta: Consulta):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(consulta);
    return this._http.put(this.urlBase + consulta._id , body , httpOptions );    
  }
}
