import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Venta } from "../modelo/venta.model";
import { ConstantsComponent } from "../app-constants";
import { Credito } from "../modelo/credito.model";
import { CreditoCliente } from "../modelo/credito.cliente.model";
import { CreditoPendienteClientes } from "../modelo/creditos-pendiente-clientes.model";

@Injectable({
    providedIn: 'root'
  })
export class CreditoService{

    facturas!: Observable<Venta[]>;
    factura!: Observable<Venta>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
        };
      }

      getAll(): Observable<any> {      
        const url=ConstantsComponent.url+":8094/credito/all";
        //const url="http://localhost:8094/credito/all";
        let body = {      
        };
        return this.httpClient.post<Credito>(url, body,{
          headers: this.getHeaders()
        })
      };

      pagar(venta: Venta): Observable<Credito> {        
        const url=ConstantsComponent.url+":8094/credito/pagar";
        let payload = {         
        };
        return this.httpClient.post<Credito>(url, venta,{
          headers: this.getHeaders()
        })
      }

      pagarMasivo(ventas: CreditoPendienteClientes[], facturaPago: string): Observable<Venta[]> {        
        const url=ConstantsComponent.url+":8094/credito/pagar-masivo";
        let payload = {};
        ventas.forEach(element => {
          element.creditoFacturaPago = facturaPago;
        });
        return this.httpClient.post<Venta[]>(url, ventas,{
          headers: this.getHeaders()
        })
      } 
      
      getCreditosXCliente(rut: number): Observable<CreditoCliente[]> {      
        const url=ConstantsComponent.url+":8094/credito/reporte-venta-clientes";
        //const url="http://localhost:8094/credito/reporte-venta-clientes";
        let body = {
          "rutCliente": rut
        };
        return this.httpClient.post<CreditoCliente[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      getAllCreditosPendientesClientes(): Observable<any> {      
        const url=ConstantsComponent.url+":8094/credito/creditos-pendientes-clientes";
        //const url="http://localhost:8094/credito/creditos-pendientes-clientes";
        let body = {
          "anoMes": null
        };
        return this.httpClient.post<any>(url, body,{
          headers: this.getHeaders()
        })
      };

      getAllCreditosPendientesClientesDetalle(rut: string): Observable<any> {      
        const url=ConstantsComponent.url+":8093/venta/getBy";
        //const url="http://localhost:8093/venta/getBy";
        let body = {
          "rutCliente": rut
        };
        return this.httpClient.post<any>(url, body,{
          headers: this.getHeaders()
        })
      };

      getCreditosMesAno(anoMes: string): Observable<CreditoCliente[]> {      
        const url=ConstantsComponent.url+":8094/credito/consulta-credito-mensual";
        //const url="http://localhost:8094/credito/consulta-credito-mensual";   
        let body;
        body = {
          "anoMes": anoMes
        };
        if (anoMes===''){
          body = {
            "anoMes": null
          };
        }     
        
        return this.httpClient.post<CreditoCliente[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      notificarCreditos(): Observable<CreditoCliente[]> {      
        const url=ConstantsComponent.url+":8096/ssh/creditos-pendientes";
        //const url="http://localhost:8096/ssh/creditos-pendientes";   
        let body = {
            "anoMes": null
          };        
        return this.httpClient.post<CreditoCliente[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      getExcelCreditosXCliente(rut: number): Observable<Blob> {      
        const url=ConstantsComponent.url+":8094/credito/export-excel";
        //const url="http://localhost:8094/credito/export-excel?rut="+rut;
        /* let body = {
          "rutCliente": rut
        }; */
        return this.httpClient.get(url, {
          responseType: 'blob'
          // headers: {  'Content-Type': "application/octet-stream",
          //             'Access-Control-Allow-Origin': '*' }
         
        })
      };


}