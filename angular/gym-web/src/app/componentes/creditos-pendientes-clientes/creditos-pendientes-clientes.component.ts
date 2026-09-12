import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConstantsComponent } from 'src/app/app-constants';
import { Articulo } from 'src/app/modelo/articulo.model';
import { CreditoClienteDetalle } from 'src/app/modelo/credito.cliente.detalle.model';
import { CreditoCliente } from 'src/app/modelo/credito.cliente.model';
import { CreditoPendienteClientes } from 'src/app/modelo/creditos-pendiente-clientes.model';
import { DetalleVenta } from 'src/app/modelo/detalle.venta.model';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { CreditoService } from 'src/app/servicios/credito.service';
import { DetalleVentaService } from 'src/app/servicios/detalle-venta.service';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-creditos-pendientes-clientes',
  templateUrl: './creditos-pendientes-clientes.component.html',
  styleUrls: ['./creditos-pendientes-clientes.component.css']
})
export class CreditosPendientesClientesComponent {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private creditoService: CreditoService,    
    private articuloService: ArticuloService,
    private router: Router,
  ) { }

  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  loader: Boolean = false;
  detallesVentas: DetalleVenta[] = [];

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      //this.router.navigate(['/']);
    }
    this.creaditoFacturaPago='';
    this.loader = true;
    this.getAllCreditosPendientesClientes();
    this.getAllProduct();
  }
  //creditoPendienteClientes
  creditoPendienteClientes: CreditoPendienteClientes[] = [];
  detalles: CreditoClienteDetalle[]=[];
  articulos: Articulo[] = [];
  creaditoFacturaPago=''
  
  columnas: string[] = ['rutCliente', 'nombre', 'paterno', 'materno', 'telefono','total','accion'];
  dataSource = new MatTableDataSource<CreditoPendienteClientes>; 

  creditoPendienteCliente: CreditoPendienteClientes = {
    id:0,
    rutCliente: '',    
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    total: ''
  }

  creditoClientes: CreditoCliente[]=[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild("detalleCreditosPendietesForm")
  detalleCreditosPendietesForm!: NgForm;

  nombreCompleto='';
  total=0;
  
  getAllCreditosPendientesClientes() {
    this.loader = true;
    this.creditoService.getAllCreditosPendientesClientes().subscribe(
      response => {
        console.log(response);        
        this.creditoPendienteClientes = response.payload;
        this.dataSource = new MatTableDataSource<CreditoPendienteClientes>(this.creditoPendienteClientes);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }

  getAllProduct() {
    this.articuloService.getAll().subscribe(
      response => {
        console.log(response);
        this.articulos = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  detalleVentas(credito: CreditoPendienteClientes) {
    this.loader = true;
    this.creaditoFacturaPago='';
    let rut = credito.rutCliente!;
    this.nombreCompleto = credito.nombre + ' ' + credito.paterno + ' ' + credito.materno;
    this.total = 0;
    this.creditoService.getAllCreditosPendientesClientesDetalle(rut).subscribe(
      response => {
        console.log(response);        
        this.creditoPendienteClientes = response.payload;
        this.creditoPendienteClientes.forEach(creditoPendienteCliente => {
          this.total += Number(creditoPendienteCliente.total);
          if (creditoPendienteCliente.id != null) {
            this.creditoPendienteClientes.forEach(creditoPendienteClienteObj => {
              if (creditoPendienteClienteObj.id != null) {                
                  creditoPendienteClienteObj.detalles!.forEach(creditoClienteDetalleObj => {
                  if (creditoClienteDetalleObj.idArticulo != null) {
                    let obj = this.articulos.find(x => x.id == creditoClienteDetalleObj.idArticulo);
                    creditoClienteDetalleObj.nombre = obj?.nombre;
                    creditoClienteDetalleObj.codBarras = obj?.codBarras;
                  }
                })        
              }
            })
          }
        })        
        this.loader = false;
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }

  onEdit(item: any) {
    debugger;
    this.detalles.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  callUrlExcel(rut: number){    
    var a = document.createElement('a');
    a.href = ConstantsComponent.url+":8094/credito/export-excel?rut="+rut;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /*pop up */
  showDialog(creditoPendienteClientes: CreditoPendienteClientes[]) {
    let that = this;
    this.confirmationDialogService.confirmThis("Ha pagado el cliente?", function () {
      that.pagar(creditoPendienteClientes);
    }, function () {
      console.log("Cierre pop up opcion NO");
    })
  }
  /* fin pop up */

  pagar(creditoPendienteClientes: CreditoPendienteClientes[]) {
    this.loader=true;
    this.creditoService.pagarMasivo(creditoPendienteClientes, this.creaditoFacturaPago).subscribe(
      response => {
        response;
        this.getAllCreditosPendientesClientes();
        this.botonCerrar.nativeElement.click();
        this.loader = false;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

}