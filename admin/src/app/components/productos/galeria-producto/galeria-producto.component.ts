import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit{

  public producto : any={};
  public id: any;
  public token: any;

  public nueva_variedad = '';
  public load_btn = false ;
  public url: any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
  
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
            }
            console.log(this.producto);
          },
          error=>{
            console.log(error);
          }
        );
      }
    );

  }
  

  ngOnInit(): void {
    
  }

  subir_imagen(){
    
  }

}
