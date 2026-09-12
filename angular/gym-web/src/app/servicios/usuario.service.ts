import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../modelo/usuario.model';
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService{

    usuarios!: Observable<Usuario[]>;
    usuario!: Observable<Usuario>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
          //Authorization:       
        };
      }

    getAllClientes(): Observable<Usuario[]> {
      const url=ConstantsComponent.url+":8070/usuario/all";      
        let body = {      
        };
        return this.httpClient.post<Usuario[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      getUsuarioByMailByPass(mail:string, pass: string): Observable<Usuario> {
        const url=ConstantsComponent.url+":8070/usuario/usuario-email-pass";        
        //const url="http://localhost:8098/usuario/usuario-email-pass";
        let body = {    
          "clave": pass,
          "email": mail
        };
        return this.httpClient.post<Usuario>(url, body,{
          headers: this.getHeaders()
        })
        };

      agregarCliente(usuario: Usuario){
        const url=ConstantsComponent.url+":8070/usuario/guardar";
        let payload = {

        };
        return this.httpClient.post<Usuario>(url, usuario,{
          headers: this.getHeaders()
        })
      }

      eliminar(usuario: Usuario){
        const url=ConstantsComponent.url+":8070/usuario/del";
        return this.httpClient.post<string>(url, usuario, {
          headers: this.getHeaders()
        })
      }

}