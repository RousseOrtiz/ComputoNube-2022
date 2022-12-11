import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit{

  public load_data = true;
  public filtro = '';
  public token: any;
  public productos : Array<any> = [];
  public url: any;

  constructor(
    private _productoService : ProductoService
  ){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log(response);
        this.productos = response.data;
        this.load_data = false;
      },
      error=>{
        console.log(error);
        
      }
    )
  }
}
