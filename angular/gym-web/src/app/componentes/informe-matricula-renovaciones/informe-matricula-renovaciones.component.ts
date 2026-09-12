import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/modelo/venta.model';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { Credito } from 'src/app/modelo/credito.model';
import { Router } from '@angular/router';
import { VentaService } from '../../servicios/venta.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { Matricula } from 'src/app/modelo/matricula.model';

@Component({
  selector: 'app-informe-matricula-renovaciones',
  templateUrl: './informe-matricula-renovaciones.component.html',
  styleUrls: ['./informe-matricula-renovaciones.component.css']
})
export class InformeMatriculaRenovacionesComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private matriculaService: MatriculaService,
    private router: Router,
    private clienteService: ClienteService) {

  }


  //spinner
  loader: Boolean = false;

  //venta
  matriculas: Matricula[] = [];
  matricula!: Matricula;

  //clientea
  clientes: Cliente[] = [];
  cliente!: Cliente;

  fechaTermino='';
  fechaInicio='';

  tipoSelected=0;

  totalIngreso=0;

  bloquear: boolean = true;

  columnas: string[] = ['id', 'tipo', 'tipoPlan', 'fechaInicio', 'alumnoRut', 'alumnoNombre', 'alumnoPaterno','valor'];
  dataSource = new MatTableDataSource<Matricula>;

  @ViewChild("productoForm")
  productoForm!: NgForm;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    //this.loader = true;
   
    //this.getCreditoAll();  
  }

  notificarVentas(){
    this.bloquear = true;
    console.log('notificar Ventas ...');
    this.loader=true;
  }

  consultar(){
    this.totalIngreso=0;
    console.log('Consultar ventas...');    
    this.loader=true;    
    this.matriculaService.getAllInformeMatriculasRenovaciones(this.fechaInicio, this.fechaTermino, this.tipoSelected)
    .subscribe(
      response => {
        this.matriculas = response;
        this.totalIngreso = this.matriculas.reduce((total, matricula) => total + (matricula.valor || 0), 0);
        this.dataSource = new MatTableDataSource<Matricula>(this.matriculas);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

 /*  getClientes() {
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
  } */

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
