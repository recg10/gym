import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/modelo/venta.model';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { CreditoService } from '../../servicios/credito.service';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { Credito } from 'src/app/modelo/credito.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-credito-mes',
  templateUrl: './credito-mes.component.html',
  styleUrls: ['./credito-mes.component.css']
})

export class CreditoMesComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private creditoService: CreditoService,
    private router: Router,
    private clienteService: ClienteService) {

  }


  //spinner
  loader: Boolean = false;

  //venta
  creditos: Credito[] = [];
  credito!: Credito;

  //cliente
  clientes: Cliente[] = [];
  cliente!: Cliente;

  fechaMesAno='';

  bloquear: boolean = false;

  columnas: string[] = ['rutCliente', 'digito', 'nombreCompleto', 'fecha', 'total', 
  'creditoFecha', 'creditoFechaPago','comentario', 'accion'];
  dataSource = new MatTableDataSource<Venta>;

  @ViewChild("productoForm")
  productoForm!: NgForm;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      //this.router.navigate(['/']);
    }
    this.loader = true;
    this.getClientes();  
    //this.getCreditoAll();  
  }

  notificarCreditos(){
    this.bloquear = true;
    console.log('notificar Creditos ...');
    this.loader=true;    
    this.creditoService.notificarCreditos().subscribe(
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
    );
  }

  consultarCreditos(){
    console.log('Consultar creditos...');
    this.loader=true;
    let fecha = this.fechaMesAno.replace('-', '/');    
    this.creditoService.getCreditosMesAno(fecha).subscribe(
      response => {
        this.creditos = response;        
        if (this.creditos) {
          this.creditos.forEach(credito => {
            if (credito.rutCliente != null) {
              let obj = this.clientes.find(x => x.rut == (credito.rutCliente));
              credito.nombreCompletoCliente = obj?.nombre + ' ' +obj?.paterno + ' ' +obj?.materno ;
              credito.digitoCliente = obj?.digito ;
            }
          });
        }        
        this.dataSource = new MatTableDataSource<Credito>(this.creditos);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  getCreditoAll(){
    this.loader=true;
    this.creditoService.getAll().subscribe(
      response => {
        this.creditos = response;        
        if (this.creditos) {
          this.creditos.forEach(credito => {
            if (credito.rutCliente != null) {
              let obj = this.clientes.find(x => x.rut == (credito.rutCliente));
              credito.nombreCompletoCliente = obj?.nombre + ' ' +obj?.paterno + ' ' +obj?.materno ;
              credito.digitoCliente = obj?.digito ;
            }
          });
        }        
        this.dataSource = new MatTableDataSource<Credito>(this.creditos);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
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

  pagar(credito: Credito) {
    this.loader=true;
    this.creditoService.pagar(credito).subscribe(
      response => {
        this.credito = response;
        //this.getCreditoAll();
        this.consultarCreditos();
        this.dataSource = new MatTableDataSource<Credito>(this.creditos);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  /*pop up */
  showDialog(credito: Credito) {
    let that = this;
    this.confirmationDialogService.confirmThis("Ha pagado el cliente?", function () {
      that.pagar(credito);
    }, function () {
      console.log("Cierre pop up opcion NO");
    })
  }
  /* fin pop up */


}
