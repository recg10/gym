import { Inject, Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alumno } from "../modelo/alumno.model";
import { Matricula } from "../modelo/matricula.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class MatriculaService{

    alumnos!: Observable<Matricula[]>;
    alumno!: Observable<Matricula>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
          //Authorization:       
        };
      }

    getAllMatriculas(): Observable<Matricula[]> {
      const url=ConstantsComponent.url+":8070/matricula/all"; 
      //const url="http://localhost:8070/matricula/all";     
        let body = {      
        };
        return this.httpClient.post<Matricula[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      /* getUsuarioByMailByPass(mail:string, pass: string): Observable<Usuario> {
        const url=ConstantsComponent.url+":8070/alumno/usuario-email-pass";        
        //const url="http://localhost:8098/usuario/usuario-email-pass";
        let body = {    
          "clave": pass,
          "email": mail
        };
        return this.httpClient.post<Usuario>(url, body,{
          headers: this.getHeaders()
        })
        };
*/
      agregar(matricula: Matricula){
        const url=ConstantsComponent.url+":8070/matricula/guardar";        
        let payload = {          
        };
        return this.httpClient.post<Matricula>(url, matricula,{
          headers: this.getHeaders()
        })
      } 

      eliminar(matricula: Matricula){
        const url=ConstantsComponent.url+":8070/matricula/del";
        //const url="http://localhost:8070/matricula/del";
        return this.httpClient.post<string>(url, matricula, {
          headers: this.getHeaders()
        })
      }

      getAllInformeMatriculasRenovaciones(fechaInicio: string, fechaTermino: string, tipo?: number): Observable<Matricula[]> {
      const url=ConstantsComponent.url+":8070/matricula/informeMatriculasRenovaciones"; 
        var fi = fechaInicio==''?null:fechaInicio+"T00:00:00";
        var ff = fechaTermino==''?null:fechaTermino+"T23:59:59";
        let tipoStr = '';
        if (tipo===0){
            tipoStr='Matricula';
        }else if (tipo===1){
            tipoStr='Renovacion';
        } else {
          tipoStr='Todos';
        }
        let body = {     
          "fechaDesde": fi,
          "fechaHasta": ff,
          "tipo": tipoStr
        };
        return this.httpClient.post<Matricula[]>(url, body,{
          headers: this.getHeaders()
        })      
      };

}