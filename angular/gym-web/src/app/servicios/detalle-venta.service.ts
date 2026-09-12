import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetalleFactura } from '../modelo/detalle.factura.model';
import { DetalleVenta } from 'src/app/modelo/detalle.venta.model';
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class DetalleVentaService{

    facturas!: Observable<DetalleFactura[]>;
    factura!: Observable<DetalleFactura>;

    constructor(private httpClient: HttpClient){

    }

    private getHeaders(){
        return {
          'Content-type':'application/json',          
          'Access-Control-Allow-Origin': '*'          
        };
      }

      getAllDetalleArticuloByIdVenta(idVenta: number): Observable<any> {
        const url=ConstantsComponent.url+":8000/detalle-venta/getBy-idVenta";
        //const url = "http://localhost:8093/detalle-venta/getBy-idVenta";
        let body = {
          "idVenta": idVenta
        };
        return this.httpClient.post<DetalleVenta[]>(url, body,{
          headers: this.getHeaders()
        })
      };

  /*   getAllFDetalleVenta(): Observable<DetalleFactura[]> {
        const url="http://170.239.85.209:8087/detalle-factura/getAll";
        let body = {      
        };
        return this.httpClient.post<DetalleFactura[]>(url, body,{
          headers: this.getHeaders()
        })
      }; */

      agregarDetallesVentas(detalleFactura: DetalleFactura[]){
        //const url="http://localhost:8093/detalle-venta/saveAll";
        const url=ConstantsComponent.url+":8000/detalle-venta/saveAll";
        let payload = {
        };
        return this.httpClient.post<DetalleFactura[]>(url, detalleFactura,{
          headers: this.getHeaders()
        })
      }

      agregarDetalleVenta(detalleFactura: DetalleFactura){
        const url=ConstantsComponent.url+":8000/detalle-venta/save";
        //const url="http://localhost:8093/detalle-venta/save";
        let payload = {
        };
        return this.httpClient.post<DetalleFactura>(url, detalleFactura,{
          headers: this.getHeaders()
        })
      }

      eliminar(detalle: DetalleVenta){        
        const url=ConstantsComponent.url+":8000/detalle-venta/del";
        //const url="http://localhost:8093/detalle-venta/del";
        /* return this.httpClient.delete<string>(url, {
          headers: this.getHeaders()
        }) */ 
        //Se reemplaza objeto, ya que el viene por parametro tiene descripcion
        let payload = {
          "id": detalle.id,
          "idVenta": detalle.idVenta,
          "idArticulo": detalle.idArticulo,
          "precio": detalle.precio,
          "cantidad": detalle.cantidad
      };      
        return this.httpClient.post<Response>(url, payload, {
          headers: this.getHeaders()
        })  
      }

}