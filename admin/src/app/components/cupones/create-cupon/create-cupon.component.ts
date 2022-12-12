import { Component , OnInit} from '@angular/core';
import { Router } from 'express';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit{

  public token: any;
  public cupon : any={
    tipo : ''
  };
  public load_btn = false;

  constructor(
    private _cuponService : CuponService,
    private _router:Router
  ){
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  
  }

  registro(registroForm: any){
    if(registroForm.valid){

      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
        response=>{
          iziToast.show({
              title : 'SUCCESS',
              titleColor : '#1DC74C',
              color: 'green',
              class : 'text-success',
              position : 'topRight',
              message : 'Nuevo cupon registrado exitosamente.' 
         });
         this._router.navigate(['/panel/cupones']);
        },
        error=>{
          console.log(error);
        }
      );
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
  

