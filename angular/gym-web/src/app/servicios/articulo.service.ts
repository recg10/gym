import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../modelo/producto.model';
import { Usuario } from '../modelo/usuario.model';
import { Articulo } from "../modelo/articulo.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class ArticuloService{

    proveedores!: Observable<Producto[]>;
    proveedor!: Observable<Producto>;

    usuario: Usuario = {};

    constructor(private httpClient: HttpClient){
      
    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
        };
      }

    getAll(): Observable<Articulo[]> {
        this.usuario = JSON.parse(localStorage.getItem('usuario')!);
        const url=ConstantsComponent.url+":8000/articulo/all";
        //const url="http://localhost:8070/articulo/all";
        let body = {
          //"usuarioRut":this.usuario.rut
        };
        return this.httpClient.post<Articulo[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      sendMail(): Observable<any> {
        //const url=ConstantsComponent.url+":8090/articulo/notificar-stock-critico";
        const url=ConstantsComponent.url+":8000/articulo/notificar-stock-critico";
          let body = {      
          };
          return this.httpClient.post<any>(url, body,{
            headers: this.getHeaders()
          })
        };

      
      /* getAllProductosCargados(): Observable<any> {
        this.usuario = JSON.parse(localStorage.getItem('usuario')!);
        const url="http://170.239.85.209:8082/cuenta/leer-producto-usuario";
        let body = { 
          "usuarioRut":this.usuario.rut
        };
        return this.httpClient.post<any>(url, body,{
          headers: this.getHeaders()
        })
      };
 */
      agregar(articulo: Articulo){
        //this.usuario = JSON.parse(localStorage.getItem('usuario')!);
        const url=ConstantsComponent.url+":8000/articulo/guardar";
        //const url="http://localhost:8070/articulo/guardar";
        //cuenta.usuarioRut=this.usuario.rut;
        let payload = {

        };
        return this.httpClient.post<Cliente>(url, articulo,{
          headers: this.getHeaders()
        })
      }

      eliminar(articulo: Articulo){        
        const url=ConstantsComponent.url+":8000/articulo/del/"+articulo.id;
        return this.httpClient.delete<string>(url, {
          headers: this.getHeaders()
        })       
      }

      /* private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      } */

}