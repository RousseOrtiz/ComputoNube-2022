import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit{

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

  agregar_variedad(){
    if(this.nueva_variedad){
      this.producto.variedades.push({titulo:this.nueva_variedad});
      this.nueva_variedad = '';
    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Complete el campo de la nueva variedad' 
     });
    }
  }

  eliminar_variedad(idx: any){
    this.producto.variedades.splice(idx,1);
  }

  actualizar(){
    if(this.producto.titulo_variedad){
      if(this.producto.variedades.length >= 1){

        this.load_btn = true;

        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad:this.producto.titulo_variedad,
          variedades: this.producto.variedades,
        },this.id,this.token).subscribe(
          response=>{
            console.log(response);
            iziToast.show({
                title : 'SUCCESS',
                titleColor : '#1DC74C',
                color: 'green',
                class : 'text-success',
                position : 'topRight',
                message : 'Variedades actualizadas exitosamente.' 
              });
            this.load_btn = false;
          }
        );
      }else{
        iziToast.show({
            title : 'ERROR',
            titleColor : '#FF0000',
            color: 'red',
            class : 'text-danger',
            position : 'topRight',
            message : 'Agregue al menos una variedad' 
         });
      }
    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Complete titulo de la variedad' 
       });
     }
  }

}
