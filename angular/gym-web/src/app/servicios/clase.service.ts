import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelo/producto.model';
import { Usuario } from '../modelo/usuario.model';
import { Articulo } from "../modelo/articulo.model";
import { Clase } from "../modelo/clase.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class ClaseService{

    clases!: Observable<Clase[]>;
    clase!: Observable<Clase>;

    usuario: Usuario = {};

    constructor(private httpClient: HttpClient){
      
    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
        };
      }

    getAll(): Observable<Clase[]> {
        //this.usuario = JSON.parse(localStorage.getItem('usuario')!);
        const url=ConstantsComponent.url+":8070/clase/all";
        //const url="http://localhost:8070/clase/all";
        let body = {
          //"usuarioRut":this.usuario.rut
        };
        return this.httpClient.post<Clase[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      
      agregar(clase: Clase){
        /* //this.usuario = JSON.parse(localStorage.getItem('usuario')!);
        const url="http://170.239.85.209:8000/articulo/guardar";
        //cuenta.usuarioRut=this.usuario.rut;
        let payload = {

        };
        return this.httpClient.post<Cliente>(url, cuenta,{
          headers: this.getHeaders()
        }) */
      }

      eliminar(cuenta: Clase){
        const url=ConstantsComponent.url+":8070/clase/del/"+cuenta.id;
        return this.httpClient.delete<string>(url, {
          headers: this.getHeaders()
        })
      }

}