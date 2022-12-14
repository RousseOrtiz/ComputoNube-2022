import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit{

  public producto : any={};
  public id: any;
  public token: any;

  public file: File | undefined;
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


  fileChangeEvent(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Sin imagen de envio' 
      });
        //volver a cargar la imagen por defecto
      this.file = undefined;
    }
    //validacion para imagen correcta
    if(file.size <= 4000000 ){
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){

        this.file = file;

      }else{
        iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'El archivo debe ser una imagen' 
      });
      $('#input-img').val('');
      this.file = undefined;
      }
    }else{
      iziToast.show({
        title : 'ERROR',
        titleColor : '#FF0000',
        color: 'red',
        class : 'text-danger',
        position : 'topRight',
        message : 'La imagen no puede superar los 4MB' 
      });
      $('#input-img').val('');
      this.file = undefined;
    }
    console.log(this.file);
  }

  subir_imagen(){
    if(this.file != undefined){
      let data = {
        imagen: this.file,
        _id: uuidv4()
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id,data,this.token).subscribe(
        response=>{
          console.log(response);
        }
      );
    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Seleccione una imagen' 
      });
    }
  }

}
