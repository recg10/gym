import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario.model';
import { Proveedor } from "../modelo/proveedor.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class ProveedorService{

  usuarios!: Observable<Proveedor[]>;
  usuario!: Observable<Proveedor>;

  constructor(private httpClient: HttpClient){

  }

  private getHeaders(){
      return {
        'Content-type':'application/json',          
        'Access-Control-Allow-Origin': '*'          
        //Authorization:       
      };
    }

  getAll(): Observable<Proveedor[]> {
    const url=ConstantsComponent.url+":8092/proveedor/all";      
      let body = {      
      };
      return this.httpClient.post<Proveedor[]>(url, body,{
        headers: this.getHeaders()
      })
    };

    agregar(usuario: Proveedor){
      const url=ConstantsComponent.url+":8092/proveedor/guardar";
      let payload = {

      };
      return this.httpClient.post<Usuario>(url, usuario,{
        headers: this.getHeaders()
      })
    }

    /*eliminar(usuario: Proveedor){
      const url="http://170.239.85.209:8092/proveedor/del";
      return this.httpClient.post<string>(url, usuario, {
        headers: this.getHeaders()
      })
    }*/

    eliminar(cuenta: Proveedor){
      const url=ConstantsComponent.url+":8092/proveedor/del/"+cuenta.rut;
      return this.httpClient.delete<string>(url, {
        headers: this.getHeaders()
      })       
    }

}