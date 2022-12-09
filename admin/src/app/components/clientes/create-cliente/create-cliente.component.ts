import { Component, OnInit } from '@angular/core';
declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit{
  public cliente : any ={
    genero: '' //inicializacion de genero
  };

  constructor() { }

  ngOnInit(): void {

  }
  registro(registroForm: any){
      if(registroForm.valid){
        console.log(this.cliente);
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
}