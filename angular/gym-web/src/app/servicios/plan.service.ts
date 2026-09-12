import { Inject, Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plan } from "../modelo/plan.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class PlanService{

    planes!: Observable<Plan[]>;
    plan!: Observable<Plan>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
          //Authorization:       
        };
      }

    getAllPlans(): Observable<Plan[]> {
      const url=ConstantsComponent.url+":8070/plan/all"; 
      //const url="http://localhost:8070/plan/all";     
        let body = {      
        };
        return this.httpClient.post<Plan[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      /* getUsuarioByMailByPass(mail:string, pass: string): Observable<Usuario> {
        const url=ConstantsComponent.url+":8070/plan/usuario-email-pass";        
        //const url="http://localhost:8098/plan/usuario-email-pass";
        let body = {    
          "clave": pass,
          "email": mail
        };
        return this.httpClient.post<Usuario>(url, body,{
          headers: this.getHeaders()
        })
        };
*/
      agregarCliente(plan: Plan){
        const url=ConstantsComponent.url+":8070/plan/guardar";
        //const url="http://localhost:8070/plan/guardar";
        let payload = {

        };
        return this.httpClient.post<Plan>(url, plan,{
          headers: this.getHeaders()
        })
      } 

      eliminar(plan: Plan){
        const url=ConstantsComponent.url+":8070/plan/del";
        //const url="http://localhost:8070/plan/del";
        return this.httpClient.post<string>(url, plan, {
          headers: this.getHeaders()
        })
      }

}