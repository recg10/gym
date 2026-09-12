import { Component } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { CreditoClienteDetalle } from 'src/app/modelo/credito.cliente.detalle.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { CreditoService } from 'src/app/servicios/credito.service';
import { CreditoCliente } from './../../modelo/credito.cliente.model';
import { ConstantsComponent } from 'src/app/app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credito-reportes',
  templateUrl: './credito-reportes.component.html',
  styleUrls: ['./credito-reportes.component.css']
})
export class CreditoReportesComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private clienteService: ClienteService,
    private creditoService: CreditoService,
    private router: Router,

  ) { }

  loader: Boolean = false;

  panelOpenState = false;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      //this.router.navigate(['/']);
    }
    this.loader = true;
    this.getAllClientes()
  }
  //cliente
  clientes: Cliente[] = [];
  clienteSelected!: Cliente;

  cliente: Cliente = {
    rut: 0,
    digito: '',
    nombre: '',
    paterno: '',
    materno: '',
    direccion: '',
    comuna: '',
    telefono: '',
    mail: ''
  }

  detalle: CreditoClienteDetalle[]=[];
  creditoClientes: CreditoCliente[]=[];
  
  fileName= 'ExcelSheet-Creditos.xlsx';

  // creditoCliente: CreditoCliente = {
  //   id: 0,
  //   fecha:'',
  //   boleta:0,
  //   total:0,
  //   pago_comentario:'',
  //   //detalle: this.detalle
  // }

  // detalle: CreditoClienteDetalle = {
  //   idArticulo:0,
  //   nombre:'',
  //   codBarras:'',
  //   cantidad:0,
  //   precio:0 
  // }

/*   exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');    
    XLSX.writeFile(wb, this.fileName); 
  }
 */

  /* exportexcel(rut: number){
    this.loader = true;
    this.creditoService.getExcelCreditosXCliente(rut).subscribe(
      (success: any) => {
        var a = document.createElement('a');
          a.href = URL.createObjectURL(success.body);
          a.download = rut.toString;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }        
    
  } */

  callUrlExcel(rut: number){    
    var a = document.createElement('a');
    a.href = ConstantsComponent.url+":8094/credito/export-excel?rut="+rut;
    //a.download = rut.toString;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  getCreditosXClientes(rut: number){
    this.loader = true;
    this.creditoService.getCreditosXCliente(rut).subscribe(
      response => {
        console.log(response);
        this.creditoClientes = response;
        this.loader = false;
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }
  

  selecionarCliente() {
    this.cliente = this.clienteSelected;
  }

  getAllClientes() {
    this.loader = true;
    this.clienteService.getAll().subscribe(
      response => {
        console.log(response);
        this.clientes = response;
        this.loader = false;
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }

}
