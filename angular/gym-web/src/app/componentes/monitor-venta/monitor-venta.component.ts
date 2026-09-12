import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { Router } from '@angular/router';
import { Asistencia } from 'src/app/modelo/asistencia.model ';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VentaService } from 'src/app/servicios/venta.service';
import { Venta } from 'src/app/modelo/venta.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DetalleVenta } from 'src/app/modelo/detalle.venta.model';

@Component({
  selector: 'app-monitor-venta',
  templateUrl: './monitor-venta.component.html',
  styleUrls: ['./monitor-venta.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MonitorVentaComponent {


  datos: Venta[] = [];
  columnasPrincipales = ['nombre'];
  elementoExpandido: Venta | null = null;

  ventas: any[] = [];
  page = 1;
  pageSize = 10;
  selectedDate = '';  
  //spinner
  loader: Boolean=false;  
  asistenciaSelected!: Asistencia;
  asistencia: Venta = {
    id: 0,
    fecha: '',
    rutCliente: 0,
    rutUsuario: 0,
    total: 0,
    pagoTipo: ''
  }
  totalAsistencias=0;
  msgError="";
  columnas: string[] = ['id',  'fecha', 'rutCliente', 'total', 'rutUsuario', 'pagoTipo', 'acción'];
  dataSource = new MatTableDataSource<Venta>;  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;  
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private dialog: MatDialog,     
    private ventaService: VentaService,
    private router: Router) { 
      //this.ventas = this.ventaService.monitorVenta();
  }

  ngOnInit(): void {
    this.loader = true;
    this.msgError="";
    //this.selectedDate = new Date().toISOString().slice(0, 10);

    const now = new Date();
    const offset = now.getTimezoneOffset(); // Obtiene diferencia en minutos
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const fecha = localDate.toISOString().slice(0, 10);
    this.selectedDate = fecha;
    console.log(fecha); // Ejemplo: 2026-05-02

    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }  
    this.ventas = new Array() 
    this.ventaService.monitorVenta(this.selectedDate).subscribe(
      response => {
        console.log(response);
        this.asistencia = response;        
        this.loader = false;
        //this.totalRowsFiltered = this.asistencias.length;
      },
      error => {
        this.msgError="Error al cargar las asistencias";
        this.loader = false;
        console.log(error);
      }
    );
    this.loader = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  // editar(asistencia: any) {
  //   const index = this.asistencias.indexOf(asistencia);
  //   const nuevoNombre = prompt('Nuevo nombre:', asistencia.nombre);
  //   if (nuevoNombre) asistencia.nombre = nuevoNombre;
  //   const nuevoRut = prompt('Nuevo RUT:', asistencia.rut);
  //   if (nuevoRut) asistencia.rut = nuevoRut;
  //   const nuevaHora = prompt('Nueva hora:', asistencia.hora);
  //   if (nuevaHora) asistencia.hora = nuevaHora;
  //   this.asistenciaService.updateAsistencia(index, asistencia);
  // }

  // eliminar(asistencia: any) {
  //   const index = this.asistencias.indexOf(asistencia);
  //   if (confirm('¿Eliminar esta asistencia?')) {
  //     this.asistenciaService.deleteAsistencia(index);
  //   }
  // }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
  }

  consultar() {
    // Lógica para consultar asistencias por fecha
    console.log('Consultando asistencias para la fecha:', this.selectedDate);
  }

  
  onErrorHandle(error: any): void{
    console.log("Error");
    
  }

  // borrar(asistencia: Asistencia){
  //     if (asistencia.id!=undefined){
  //         this.asistenciaService.eliminar(asistencia).subscribe(
  //           (data: any)=>{
  //           console.log(data);  
  //           this.consultarMonitorFecha();
           
  //         }, 
  //         (error)=>{this.onErrorHandle(error);
  //         });
  //       }
  //     }  

  /*pop up */
    showDialog(asistencia: Asistencia) {  
      let that = this;
      this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
         //that.borrar(asistencia);
      }, function () {  
        console.log("Cierre pop up opcion NO");
      })  
    }
  /* fin pop up */

  consultarMonitorFecha() {      
    this.loader=true;
    this.msgError="";
    this.ventaService.monitorVenta(this.selectedDate).subscribe(
      response => {
        console.log(response);
        this.ventas = response.payload;
        this.datos = response.payload;
        // ejemplo de uso de detalle (no unir con join sobre un array de objetos)
        let detalle = new DetalleVenta();
        detalle.articuloDescripcion = "prueba detalle";
        detalle.precio = 1000;
        this.datos[0].detalles = new Array();
        this.datos[0].detalles?.push(detalle);
        let detalle1 = new DetalleVenta();
        detalle1.articuloDescripcion = "prueba detalle 1";
        detalle1.precio = 1500;
        this.datos[0].detalles?.push(detalle1);

        this.dataSource = new MatTableDataSource<any>(this.ventas);
        this.dataSource.paginator = this.paginator;
        this.loader=false;
      },
      error =>{
        console.log(error);
        this.msgError=error.error.messageSPF;
        this.loader=false;
      }
    );
}

}