import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit{
  [x: string]: any;

  public cliente:any = {};

  constructor(
    private _route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this['id'] = params['id'];
        console.log(this['id'])
      }
    )
  }

  actualizar(updateForm: any){

  }

}
