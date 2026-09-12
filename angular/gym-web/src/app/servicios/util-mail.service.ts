import { Inject, Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario.model';
import { ConstantsComponent } from "../app-constants";
import { Mail } from "../modelo/mail.model";

@Injectable({
    providedIn: 'root'
  })
export class UtilMailService{

    usuarios!: Observable<Usuario[]>;
    usuario!: Observable<Usuario>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'
        };
      }

    sendMail(mail: Mail ): Observable<any> {
      //const url=ConstantsComponent.url+":8099/mail/sendMail";      
      const url=ConstantsComponent.url+":8099/mail/sendMail";      
        let body = {      
        };
        return this.httpClient.post<any>(url, mail,{
          headers: this.getHeaders()
        })
      };

}