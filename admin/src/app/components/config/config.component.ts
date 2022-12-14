import { Component , OnInit} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast:any;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  public token : any;
  public config : any= {};
  public url: any;

  public titulo_cat ='';
  public icono_cat ='';
  public file: File | undefined;
  public imgSelect: any;

  constructor(
    private _adminService: AdminService
    ) {
      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;
      this._adminService.obtener_config_admin(this.token).subscribe(
        response=>{
          this.config = response.data;
          console.log(this.config);
        },
        error=>{
          console.log(error);
        }
      );
    }

  ngOnInit(): void {
    
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());

      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4() //identificador del metodo de categorias 
      });

      this.titulo_cat = '';
      this.icono_cat = '';
   
    }else{
      iziToast.show({
          title : 'ERROR',
          titleColor : '#FF0000',
          color: 'red',
          class : 'text-danger',
          position : 'topRight',
          message : 'Ingrese un titulo e icono para la caegoria' 
       });
    }
  }

  actualizar(confForm: any){
    if(confForm.valid){
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }
      console.log(data);

      this._adminService.actualiza_config_admin("63979850d37f4b1af99ae09f",data,this.token).subscribe(
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
        message : 'Completar correctamente el formulario' 
     });
    }
  }

  fileChangeEvent(event:any){
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
        $(".cs-file-drop-icon").addClass('cs-file-drop-preview img-thumbnail rounded');
        $(".cs-file-drop-icon").addClass('cs-filedrop-icon cxi-upload');
        reader.readAsDataURL(file);
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

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }



}

