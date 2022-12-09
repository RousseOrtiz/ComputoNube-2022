import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

declare var iziToast:any;
declare var jQuer:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit{

  public producto : any = {};
  public file:any;
  public imgSelect : any | ArrayBuffer ='assets/img/01.jpg';

  constructor(){}

  ngOnInit(): void {
    
  }

  registro(registroForm: any){
    if(registroForm.valid){

    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Los datos del formulario no son validos' 
        });
    }
  }
//obtencion de imagen
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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';   //volver a cargar la imagen por defecto
      this.file = undefined;
    }
    //validacion para imagen correcta
    if(file.size <= 4000000 ){
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result; //obtencion imagen subida
        console.log(this.imgSelect);
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);

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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';   //volver a cargar la imagen por defecto
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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
  }

}
