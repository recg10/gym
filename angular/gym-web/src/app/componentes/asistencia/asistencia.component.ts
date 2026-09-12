import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrarAsistenciaDialogComponent } from '../registrar-asistencia-dialog/registrar-asistencia-dialog.component';
import { AsistenciaService } from '../../servicios/asistencia.service';
import { ClaseService } from 'src/app/servicios/clase.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { UtilMailService } from 'src/app/servicios/util-mail.service';
import { Asistencia } from 'src/app/modelo/asistencia.model ';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent {

  asistencias: any[] = [];
  page = 1;
  pageSize = 10;
  selectedDate = '';  
  //spinner
  loader: Boolean=false;  
  asistenciaSelected!: Asistencia;
  asistencia: Asistencia = {
    id: 0,
    fecha: '',
    rutAlumno: '',
    usuario: '',
    matriculaId: 0,
    color: ''
  }
  totalAsistencias=0;
  msgError="";
  columnas: string[] = ['id',  'fecha', 'rutAlumno', 'usuario', 'matriculaId', 'alumnoNombre', 'alumnoPaterno', 'alumnoMaterno', 'acción'];
  dataSource = new MatTableDataSource<Asistencia>;  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;  
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private dialog: MatDialog, 
    private asistenciaService: AsistenciaService,
    private router: Router) { 
      this.asistencias = this.asistenciaService.getAsistencias();
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
    this.asistencias = new Array() 
    this.asistenciaService.getAsistenciaXFecha(this.selectedDate, '').subscribe(
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

  editar(asistencia: any) {
    const index = this.asistencias.indexOf(asistencia);
    const nuevoNombre = prompt('Nuevo nombre:', asistencia.nombre);
    if (nuevoNombre) asistencia.nombre = nuevoNombre;
    const nuevoRut = prompt('Nuevo RUT:', asistencia.rut);
    if (nuevoRut) asistencia.rut = nuevoRut;
    const nuevaHora = prompt('Nueva hora:', asistencia.hora);
    if (nuevaHora) asistencia.hora = nuevaHora;
    this.asistenciaService.updateAsistencia(index, asistencia);
  }

  eliminar(asistencia: any) {
    const index = this.asistencias.indexOf(asistencia);
    if (confirm('¿Eliminar esta asistencia?')) {
      this.asistenciaService.deleteAsistencia(index);
    }
  }

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

  borrar(asistencia: Asistencia){
      if (asistencia.id!=undefined){
          this.asistenciaService.eliminar(asistencia).subscribe(
            (data: any)=>{
            console.log(data);  
            this.consultarFecha();
           
          }, 
          (error)=>{this.onErrorHandle(error);
          });
        }
      }  

  /*pop up */
    showDialog(asistencia: Asistencia) {  
      let that = this;
      this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
         that.borrar(asistencia);
      }, function () {  
        console.log("Cierre pop up opcion NO");
      })  
    }
  /* fin pop up */

  consultarFecha() {      
    this.loader=true;
    this.msgError="";
    this.asistenciaService.getAsistenciaXFecha(this.selectedDate, '').subscribe(
      response => {
        console.log(response);
        this.asistencias = response.payload;
        this.dataSource = new MatTableDataSource<Asistencia>(this.asistencias);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.filterByNombre();
        this.loader=false;
      },
      error =>{
        console.log(error);
        this.msgError=error.error.messageSPF;
        this.loader=false;
      }
    );
}


registrarAsistencia() {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // Obtiene diferencia en minutos
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const fecha = localDate.toISOString().slice(0, 10);    
    let fechaEnvio = '';
    if (this.selectedDate === fecha) {
      fechaEnvio = localDate.toISOString();
    }else{
      fechaEnvio = this.selectedDate+'T00:00:00'; // Agrega la parte de la hora para que sea un formato completo de fecha y hora
    }
    const dialogRef = this.dialog.open(RegistrarAsistenciaDialogComponent, { data: { selectedDate: fechaEnvio } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.error) {
          this.msgError=result.error.messageSPF;
        }else{
          this.msgError='';
          this.consultarFecha();
        }        
      }
    });
  }

  

}