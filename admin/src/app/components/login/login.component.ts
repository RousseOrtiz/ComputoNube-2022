import { Component, OnInit } from '@angular/core';


declare var jQuer:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user : any = {};

  constructor(){

  }
  ngOnInit(): void{
  }

  login(loginForm: { valid: any; }){
    if(loginForm.valid){
      console.log(this.user);

      alert('si es valido');
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
