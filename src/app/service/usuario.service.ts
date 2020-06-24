import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userLoggedIn: boolean = false;
  userLogged: Persona;
  urlBase: string = "http://localhost:3000/api/usuarios/";

  constructor(private _http:HttpClient) { }

  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }

    return this._http.get(this.urlBase, httpOptions);
  }

  public logout() {
    this.userLogged = new Persona();
    this.userLoggedIn = false;
    } 
}
