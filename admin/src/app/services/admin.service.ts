import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL"; //para la comunicacion con el back
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(
    private _http: HttpClient,
  ){
  
    this.url = GLOBAL.url;
  }
// se pasa data para recibir la contraseña y correo
  login_admin(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});

  }

  getToken(){
    return localStorage.getItem('token');
  }

  //metodo de autenticacion
  public isAuthenticated (allowRoles : string[]):boolean{
    return false;

  }
}
