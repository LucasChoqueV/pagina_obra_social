import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialista } from '../models/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  espLoggedIn: boolean = false;
  espLogged: Especialista;
  urlBase: string = "http://localhost:3000/api/especialistas/";

  constructor(private _http: HttpClient) { }

  getEspecialistas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }

    return this._http.get(this.urlBase, httpOptions);
  }

  getEspecialista(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }
    return this._http.get(this.urlBase + id, httpOptions);
  }

  createEspecialista(espNuevo: Especialista): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var body = JSON.stringify(espNuevo);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteEspecialista(especialista: Especialista):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + especialista._id , httpOptions );
  }

  updateEspecialista(especialista: Especialista):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(especialista);
    return this._http.put(this.urlBase + especialista._id , body , httpOptions );    
  }

  public logout() {
    this.espLogged = new Especialista();
    this.espLoggedIn = false;
  }
}
