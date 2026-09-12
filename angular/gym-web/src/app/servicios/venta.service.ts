import { Inject, Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetalleFactura } from '../modelo/detalle.factura.model';
import { Venta } from "../modelo/venta.model";
import { DetalleVenta } from "../modelo/detalle.venta.model";
import { ConstantsComponent } from "../app-constants";

@Injectable({
    providedIn: 'root'
  })
export class VentaService{

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

      getMaximo(): Observable<any> {
        //const url="http://localhost:8000/folio-venta/maximo";
        const url=ConstantsComponent.url+":8000/folio-venta/maximo";
        let body = {      
        };
        return this.httpClient.post<number>(url, body,{
          headers: this.getHeaders()
        })
      };

      generarVenta(venta: Venta, detalle: DetalleVenta[]){
        //const url="http://localhost:8000/venta/generar-venta";
        const url=ConstantsComponent.url+":8000/venta/generar-venta";
        let payload = {
          "venta": venta,
          "detalle": detalle
        };
        return this.httpClient.post<DetalleFactura[]>(url, payload,{
          headers: this.getHeaders()
        })
      }

      cancelarVenta(venta: Venta, detalle: DetalleVenta[]){
        //const url="http://localhost:8000/venta/cancelar-venta";
        const url=ConstantsComponent.url+":8000/venta/cancelar-venta";
        let payload = {
          "venta": venta,
          "detalle": detalle
        };
        return this.httpClient.post<DetalleFactura[]>(url, payload,{
          headers: this.getHeaders()
        })
      }


      save(venta: Venta): Observable<Venta> {
        //const url="http://localhost:8000/venta/save";
        const url=ConstantsComponent.url+":8000/venta/save";
        let payload = {         
        };
        return this.httpClient.post<Venta>(url, venta,{
          headers: this.getHeaders()
        })
      }

      getAllFacturas(): Observable<DetalleFactura[]> {
        const url=ConstantsComponent.url+":8000/venta/getAll";
        let body = {      
        };
        return this.httpClient.post<DetalleFactura[]>(url, body,{
          headers: this.getHeaders()
        })
      };

      informeVentas(fechaInicio: string, fechaTermino: string, pagoTipo?: any ): Observable<any> {
        const url=ConstantsComponent.url+":8000/venta/informe-venta";
        var fi = fechaInicio==''?null:fechaInicio+"T00:00:00";
        var ff = fechaTermino==''?null:fechaTermino+"T23:59:59";
        let body = {     
          "fechaDesde": fi,
          "fechaHasta": ff,
          "pagoTipo": pagoTipo==''?null:pagoTipo
        };
        return this.httpClient.post<any>(url, body,{
          headers: this.getHeaders()
        })
      };

    monitorVenta(fecha: string): Observable<any> {
      const url=ConstantsComponent.url+":8000/venta/monitor-venta";    
      const queryParams = { 
        fecha: fecha
      };
      return this.httpClient.get<any>(url, { params: queryParams });
    };


/* 
      agregarDetalleFactura(detalleFactura: DetalleFactura[]){
        const url="http://170.239.85.209:8087/detalle-factura/save";
        let payload = {

        };
        return this.httpClient.post<DetalleFactura[]>(url, detalleFactura,{
          headers: this.getHeaders()
        })
      }

      eliminarFactura(factura: DetalleFactura){

        const options = {
          headers: this.getHeaders,
          body: {
            id: factura.id ,
          },
        };

        const url="http://170.239.85.209:8087/detalle-factura/del";
        return this.httpClient.delete<string>(url, {
          headers: this.getHeaders(),
          body: { id: factura.id },
        })
      } */

}