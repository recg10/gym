import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asistencia } from '../modelo/asistencia.model ';
import { ConstantsComponent } from '../app-constants';
import { CreditoCliente } from '../modelo/credito.cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private asistencias = [
    { nombre: 'Juan Pérez', rut: '12.345.678-9', hora: '08:00' },
    { nombre: 'María García', rut: '98.765.432-1', hora: '08:15' },
    { nombre: 'Carlos López', rut: '11.111.111-1', hora: '09:00' },
    { nombre: 'Ana Martínez', rut: '22.222.222-2', hora: '09:30' }
  ];

    private getHeaders(){
      return {
        'Content-type':'application/json',          
        'Access-Control-Allow-Origin': '*'          
      };
    }

  private asistenciasSubject = new BehaviorSubject<any[]>(this.asistencias);

  asistencias$ = this.asistenciasSubject.asObservable();

    constructor(private httpClient: HttpClient){      
    }

  getAsistencias() {
    return this.asistenciasSubject.value;
  }

  addAsistencia(asistencia: any) {
    this.asistencias.push(asistencia);
    this.asistenciasSubject.next(this.asistencias);
  }

  updateAsistencia(index: number, asistencia: any) {
    this.asistencias[index] = asistencia;
    this.asistenciasSubject.next(this.asistencias);
  }

  eliminar(asistencia: Asistencia){
          const url=ConstantsComponent.url+":8070/asistencia/"+asistencia.id;
          //const url="http://localhost:8070/asistencia/"+asistencia.id;
          return this.httpClient.delete<string>(url, {
            headers: this.getHeaders()            
          })
        }

  deleteAsistencia(index: number) {
    this.asistencias.splice(index, 1);
    this.asistenciasSubject.next(this.asistencias);
  }

  getAsistenciaXFecha(fecha: string, rut: string): Observable<any> {
      const url=ConstantsComponent.url+":8070/asistencia/consulta";
      //const url="http://localhost:8070/asistencia/consulta";
      /*let body = {
        "rutCliente": rut
      };*/
      const queryParams = { 
        fecha: fecha, 
        rut: rut
      };
      return this.httpClient.get<any>(url, { params: queryParams });
    };

    registrarAsistencia(rut: string, rutUsuario: string, fecha: string): Observable<any> {
      const url=ConstantsComponent.url+":8070/asistencia/registrar-asistencia";
      let usuario = JSON.parse(localStorage.getItem('usuario')!);
      rutUsuario = usuario.rut.split('-')[0];
      //const url="http://localhost:8070/asistencia/registrar-asistencia";
      let body = {         
        rutAlumno: rut,
        usuario: rutUsuario,
        fecha: fecha // Aquí puedes reemplazar con el usuario real si lo tienes disponible
      };
      return this.httpClient.post<any>(url, body , {
          headers: this.getHeaders()
        })
    };

    informeAsistencia(fechaInicio: string, fechaTermino: string, rutAlumno?: string): Observable<any> {
        const url=ConstantsComponent.url+":8070/asistencia/informe-asistencia";
        var fi = fechaInicio==''?null:fechaInicio+"T00:00:00";
        var ff = fechaTermino==''?null:fechaTermino+"T23:59:59";
        let body = {     
          "fechaDesde": fi,
          "fechaHasta": ff,
          "rutAlumno": rutAlumno
        };
        return this.httpClient.post<any>(url, body,{
          headers: this.getHeaders()
        })
      };

}
