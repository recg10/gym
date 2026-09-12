import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/modelo/venta.model';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { Router } from '@angular/router';
import { VentaService } from './../../servicios/venta.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { InformeAsistencia } from 'src/app/modelo/informe.asistencia.model.';

@Component({
  selector: 'app-asistencia-informe',
  templateUrl: './asistencia-informe.component.html',
  styleUrls: ['./asistencia-informe.component.css']
})
export class AsistenciaInformeComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private ventaService: VentaService,
    private router: Router,
    private clienteService: ClienteService,
    private asistenciaService: AsistenciaService) {

  }


  //spinner
  loader: Boolean = false;

  //venta
  informeAsistencias: InformeAsistencia[] = [];
  informeAsistencia!: InformeAsistencia;

  //clientea
  clientes: Cliente[] = [];
  cliente!: Cliente;

  fechaTermino='';
  fechaInicio='';

  vigenciaSelected='';

  totalAsistencias=0;

  bloquear: boolean = true;

  rutAlumno?: string;
  msgError='';
  columnas: string[] = ['rutAlumno', 'nombreAlumno', 'paternoAlumno', 'maternoAlumno', 'fecha', 'matriculaId'];
  dataSource = new MatTableDataSource<InformeAsistencia>;

  @ViewChild("productoForm")
  productoForm!: NgForm;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    this.loader = true;
    this.getClientes();  
    //this.getCreditoAll();  
  }

  notificarVentas(){
    this.bloquear = true;
    console.log('notificar Ventas ...');
    this.loader=true;    
    /*this.ventaService.notificarCreditos().subscribe(
      response => {
        this.creditos = response;
        console.log('Respuesta creditos:'+this.creditos);
        this.loader = false;
        setTimeout( () => {          
          this.bloquear = false;
        }, 180000);
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );*/
  }

  consultarAsistencias(){
    this.totalAsistencias=0;
    console.log('Consultar asistencias...');    
    this.loader=true;    
    this.msgError='';
    if (this.rutAlumno==='') {
        this.rutAlumno=undefined;
    }
    this.asistenciaService.informeAsistencia(this.fechaInicio, this.fechaTermino, this.rutAlumno).subscribe(
      response => {
        this.informeAsistencias = response['payload'];
      /*   if (this.ventas) {
          this.ventas.forEach(venta => {
            if (venta.rutAlumno != null) {
              let obj = this.clientes.find(x => x.rut == (venta.rutCliente));
              venta.nombreCliente = obj?.nombre + ' ' +obj?.paterno + ' ' +obj?.materno ;
              venta.digitoCliente = obj?.digito ;
            }
            //this.totalAsistencias+=venta.total!;
          });
        } */
        this.dataSource = new MatTableDataSource<InformeAsistencia>(this.informeAsistencias);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        this.msgError=error.error.messageSPF;
        this.loader = false;
        console.log(error);
      }
    );
  }

  getClientes() {
    this.loader=true;
    this.clienteService.getAll().subscribe(
      response => {
        this.clientes = response;
        //this.getCreditoAll();
        this.loader=false;
      },
      error => {
        console.log(error);
        this.loader=false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  editar(dto: Venta) {
    this.productoForm.setValue(dto);
  }

  onErrorHandle(error: any): void {
    console.log("Error");
  }
}
