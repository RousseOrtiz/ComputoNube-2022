//enrutado del proyecto
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

//array con todas las rutas
const appRoute : Routes = [
    {path: "", component: InicioComponent},
    {path: 'login', component: LoginComponent} //ruta para el componnete login
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
