import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { Venta } from 'src/app/modelo/venta.model';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { CreditoService } from '../../servicios/credito.service';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { Credito } from 'src/app/modelo/credito.model';
import { Router } from '@angular/router';
import { VentaService } from './../../servicios/venta.service';
import { ConstantsComponent } from 'src/app/app-constants';

@Component({
  selector: 'app-informe-venta',
  templateUrl: './informe-venta.component.html',
  styleUrls: ['./informe-venta.component.css']
})
export class InformeVentaComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private ventaService: VentaService,
    private router: Router,
    private clienteService: ClienteService) {

  }


  //spinner
  loader: Boolean = false;

  //venta
  ventas: Venta[] = [];
  credito!: Credito;

  //clientea
  clientes: Cliente[] = [];
  cliente!: Cliente;

  fechaTermino='';
  fechaInicio='';

  conCreditoSelected='';

  pagoTipoSelected=0;

  totalVentas=0;

  bloquear: boolean = true;

  columnas: string[] = ['id', 'fecha', 'total', 'pagoTipo'];
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
    //this.loader = true;
    //this.getClientes();  
    //this.getCreditoAll();  
  }

  callUrlExcel(){    
    // let a = document.createElement('a');
    // a.href = ConstantsComponent.url+":8094/credito/export-excel"
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // Crear la hoja de trabajo a partir del JSON
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ventas);
    // Crear el libro de trabajo y añadir la hoja
    const workbook: XLSX.WorkBook = { 
      Sheets: { 'Datos': worksheet }, 
      SheetNames: ['Datos'] 
    };
    // Guardar y descargar el archivo con un nombre específico
    XLSX.writeFile(workbook, 'reporte-datos.xlsx');
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

  consultarVentas(){
    this.totalVentas=0;
    this.loader=true;
    console.log('Consultar ventas...');
    let pagoTipo=null;
    if (this.pagoTipoSelected===0)
      pagoTipo = 'contado';
    else if (this.pagoTipoSelected===1)
      pagoTipo = 'debito';
    else if (this.pagoTipoSelected===2)
      pagoTipo = 'credito';

    this.ventaService.informeVentas(this.fechaInicio, this.fechaTermino, pagoTipo).subscribe(
      response => {
        this.ventas = response['payload'];
        if (this.ventas) {
          this.ventas.forEach(venta => {
            if (venta.rutCliente != null) {
              let obj = this.clientes.find(x => x.rut == (venta.rutCliente));
              venta.nombreCliente = obj?.nombre + ' ' +obj?.paterno + ' ' +obj?.materno ;
              venta.digitoCliente = obj?.digito ;
            }
            this.totalVentas+=venta.total!;
          });
        }
        this.dataSource = new MatTableDataSource<Credito>(this.ventas);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  // getClientes() {
  //   this.loader=true;
  //   this.clienteService.getAll().subscribe(
  //     response => {
  //       this.clientes = response;
  //       //this.getCreditoAll();
  //       this.loader=false;
  //     },
  //     error => {
  //       console.log(error);
  //       this.loader=false;
  //     }
  //   );
  // }

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
