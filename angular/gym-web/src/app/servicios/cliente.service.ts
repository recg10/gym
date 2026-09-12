import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario.model';
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class ClienteService{

  usuarios!: Observable<Cliente[]>;
  usuario!: Observable<Cliente>;

  constructor(private httpClient: HttpClient){

  }

  private getHeaders(){
      return {
        'Content-type':'application/json',          
        'Access-Control-Allow-Origin': '*'        
      };
    }

  getAll(): Observable<Cliente[]> {
    const url=ConstantsComponent.url+":8091/cliente/all";      
      let body = {      
      };
      return this.httpClient.post<Cliente[]>(url, body,{
        headers: this.getHeaders()
      })
    };

    agregar(usuario: Cliente){
      const url=ConstantsComponent.url+":8091/cliente/guardar";
      let payload = {

      };
      return this.httpClient.post<Usuario>(url, usuario,{
        headers: this.getHeaders()
      })
    }

    eliminar(cuenta: Cliente){
      const url=ConstantsComponent.url+":8091/cliente/del/"+cuenta.rut;
      return this.httpClient.delete<string>(url, {
        headers: this.getHeaders()
      })       
    }

}