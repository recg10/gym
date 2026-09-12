import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario.model';
import { ConstantsComponent } from "../app-constants";
import { Parametro } from "../modelo/parametro.model";

@Injectable({
    providedIn: 'root'
  })
export class ParametroService{

    usuarios!: Observable<Parametro[]>;
    usuario!: Observable<Parametro>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
          //Authorization:       
        };
      }

    getAll(): Observable<Parametro[]> {
      const url=ConstantsComponent.url+":8070/parametro/all";      
      //const url="http://localhost:8070/parametro/all";      
        let body = {      
        };
        return this.httpClient.post<Usuario[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      agregar(usuario: Parametro){
        const url=ConstantsComponent.url+":8070/parametro/guardar";
        //const url="http://localhost:8070/parametro/guardar";
        let payload = {

        };
        return this.httpClient.post<Usuario>(url, usuario,{
          headers: this.getHeaders()
        })
      }

      eliminar(usuario: Parametro){
        const url=ConstantsComponent.url+":8070/parametro/del";
        //const url="http://localhost:8070/parametro/del";
        return this.httpClient.post<string>(url, usuario, {
          headers: this.getHeaders()
        })
      }

}