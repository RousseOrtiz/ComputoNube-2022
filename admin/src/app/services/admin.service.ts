import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL"; //para la comunicacion con el back
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '@angular/compiler';


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
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  //metodo de autenticacion y validacion de token
 public isAuthenticated(allowRoles : string[]):boolean{

  const token = localStorage.getItem('token');


  if(!token){
    return false;
  }

  try{
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    console.log(decodedToken);

    if(!decodedToken){
      console.log('NO A');
      localStorage.removeItem('token');
      return false;
    }
  } catch (error){
    localStorage.removeItem('token');
    return false;
  }
  return allowRoles.includes(decodedToken['role']);
 }
}
