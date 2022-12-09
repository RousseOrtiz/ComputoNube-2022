import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL"; //para la comunicacion con el back
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  listar_clientes_filtro_admin(tipo: string | null,filtro: string | null,token: string):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_clientes_filtro_admin/'+tipo+'/'+filtro,{headers:headers});
  }

  registro_cliente_admin(data:string ,token: string):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_cliente_admin',data,{headers:headers});
  }

}
