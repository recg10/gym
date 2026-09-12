import { Inject, Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConstantsComponent } from "../app-constants";
import { Alumno } from "../modelo/alumno.model";

@Injectable({
    providedIn: 'root'
  })
export class AlumnoService{

    alumnos!: Observable<Alumno[]>;
    alumno!: Observable<Alumno>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
          //Authorization:       
        };
      }

    getAllAlumnos(): Observable<Alumno[]> {
      const url=ConstantsComponent.url+":8070/alumno/all"; 
      //const url="http://localhost:8070/alumno/all";     
        let body = {      
        };
        return this.httpClient.post<Alumno[]>(url, body,{
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
      agregarCliente(alumno: Alumno){
        const url=ConstantsComponent.url+":8070/alumno/guardar";
        //const url="http://localhost:8070/alumno/guardar";
        let payload = {

        };
        return this.httpClient.post<Alumno>(url, alumno,{
          headers: this.getHeaders()
        })
      } 

      eliminar(alumno: Alumno){
        const url=ConstantsComponent.url+":8070/alumno/del";
        //const url="http://localhost:8070/alumno/del";
        return this.httpClient.post<string>(url, alumno, {
          headers: this.getHeaders()
        })
      }

}