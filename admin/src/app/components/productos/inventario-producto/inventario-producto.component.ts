import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { raceWith } from 'rxjs';

declare var iziToast: any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit{
  
  public id: any;
  public token : any;
  public producto : any = {};
  public inventarios : Array<any>= [];

  public load_btn = false;

  constructor(
    private _route : ActivatedRoute,
    private _productoService  : ProductoService,
  ){
    this.token = localStorage.getItem('token');
  }


  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);

        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;

              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response=>{
                   this.inventarios = response.data;
                   console.log(this.inventarios);
                },
                error=>{
                  console.log(error);
                }
               )
            }
          },
          error=>{
            console.log(error);
          }
        );
      }
    );
  }

  eliminar(id: any){
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
            title : 'SUCCESS',
            titleColor : '#1DC74C',
            color: 'green',
            class : 'text-success',
            position : 'topRight',
            message : 'Producto eliminado exitosamente.' 
       });
       $('#delete-'+id).modal('hide'); //para cerrar el modal 
       $('.modal-backdrop').removeClass('show');

       this.load_btn = false;
       //mostrar tabla actualizada
       this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
        response=>{
           this.inventarios = response.data;
           console.log(this.inventarios);
        },
        error=>{
          console.log(error);
        }
       )
      
      },
      error=>{
        iziToast.show({
            title : 'ERROR',
            titleColor : '#1DC74C',
            color: 'red',
            class : 'text-danger',
            position : 'topRight',
            message : 'Error en el servidor' 
       });
        console.log(error);
        this.load_btn = false;
      }
    )
  }

}
