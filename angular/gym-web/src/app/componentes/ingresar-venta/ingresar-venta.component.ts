import { DetalleFactura } from './../../modelo/detalle.factura.model';
import { ChangeDetectorRef, AfterContentChecked, Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog.service';
import { DetalleVentaService } from '../../servicios/detalle-venta.service';
import { ArticuloService } from '../../servicios/articulo.service';
import { ProveedorService } from './../../servicios/proveedor.service';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/modelo/articulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Clase } from 'src/app/modelo/clase.model';
import { DetalleVenta } from 'src/app/modelo/detalle.venta.model';
import { VentaService } from 'src/app/servicios/venta.service';
import { Venta } from 'src/app/modelo/venta.model';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {

  constructor(
    private confirmationDialogService: ConfirmDialogService,
    private detalleVentaService: DetalleVentaService,
    private ventaService: VentaService,
    private articuloService: ArticuloService,
    private clienteService: ClienteService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  detalleFacturas!: DetalleFactura[];
  detalleFactura: DetalleFactura = {
    id: 0,
    numeroFactura: '',
    codigoProducto: '',
    precio: 0,
    cantidad: 0
  }

  //spinner
  loader: Boolean = false;
  selectedRowIndex: number = -1;

  articulos: Articulo[] = [];
  articulosVenta: Articulo[] = [];
  detallesVentas: DetalleVenta[] = [];

  articuloSelected!: Articulo;

  productoSelected!: string;
  cantidadIngresada: number = 0;

  clases: Clase[] = [];
  claseSelected!: Clase;
  clase: Clase = {
    id: 0,
    descripcion: ''
  }

  venta: Venta = {
    id: 0,
    rutCliente: 0,
    total: 0,
    fecha: '',
    rutUsuario: 0,
    boleta: 0,
    credito: 0,
    creditoFecha: '',
    pagoComentario: '',
    pagoTipo: ''
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  columnas: string[] = ['codigo', 'nombre', 'clase', 'precio_venta', 'stock', 'stock_min'];
  dataSource = new MatTableDataSource<Articulo>;

  @ViewChild("detalleFacturaForm")
  detalleFacturaForm!: NgForm;

  @ViewChild("facturaForm")
  facturaForm!: NgForm;

  @ViewChild("finalizarVentaForm")
  finalizarVentaForm!: NgForm;


  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  @ViewChild("botonCerrarFinalizaVenta")
  botonCerrarFinalizaVenta!: ElementRef;

  //paginacion 
  totalRowsFiltered!: number;
  pageSize = 50;
  page = 1;
  lastPage = 1;
  firstPage = 1;

  timerId: string | number | NodeJS.Timer | undefined;

  maximo = 0;

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

  disableSelect = new FormControl(false);
  selectedOpcionPago = "seleccione";
  selectedTipoPago: string = "seleccione"

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    this.cantidadIngresada = 0;
    this.detalleFacturas = new Array()
    this.articulosVenta = new Array()
    this.getAllClientes()
    this.loader = true;
    this.articuloService.getAll().subscribe(
      response => {
        console.log(response);
        this.articulos = response;
        this.dataSource = new MatTableDataSource<Articulo>(this.articulos);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.filterByNombre();
        //this.dataSource.sort = this.sort;
        this.loader = false;
        //this.totalRowsFiltered = this.cuentas.length;
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  onErrorHandle(): void {
    console.log("Error");
  }

  getMaximo() {
    this.loader = true
    this.ventaService.getMaximo().subscribe(
      response => {
        console.log(response);
        //let data = JSON.stringify(response);        
        this.maximo = response['payload'];
        this.venta.id = this.maximo
        this.loader = false
      },
      error => {
        console.log(error);
        this.loader = false
      }
    );
  }

  inciarVenta() {
    this.loader = true
    //this.getMaximo()
    //this.venta.id=this.maximo;
    this.ventaService.getMaximo().subscribe(
      response => {
        console.log(response);
        //let data = JSON.stringify(response);        
        this.maximo = response['payload'];
        this.venta.id = this.maximo
        this.venta.rutCliente = this.clienteSelected.rut;
        this.venta.rutUsuario = 1 //temporal 
        this.ventaService.save(this.venta).subscribe(
          response => {
            console.log(response);
            this.loader = false
          },
          error => {
            console.log(error);
            this.loader = false
          });
      },
      error => {
        console.log(error);
        this.loader = false
      });
  }

  isAgregarProducto() {
    if (this.cliente.rut == 0) {
      return true;
    }
    if (this.maximo == 0) {
      return true;
    }
    return false;
  }

  isIniciarVenta() {
    if (this.cliente.rut == 0) {
      return true;
    }
    if (this.maximo != 0 && this.cliente.rut != 0) {
      return true;
    }
    return false;
  }


  cancelarVenta() {
    console.log('cancelar venta...')
    this.loader = true
    this.venta.credito = 0;    
    this.ventaService.cancelarVenta(this.venta, this.detallesVentas).subscribe(
      response => {
        console.log(response);
        this.detallesVentas = [];
        this.venta = {};
        this.clienteSelected = {} ;
        this.cliente = {} ;
        //this.clientes[-1];
        /*this.cliente = {
          rut: undefined,
          digito: '',
          nombre: '',
          paterno: '',
          materno: '',
          direccion: '',
          comuna: '',
          telefono: '',
          mail: ''
        };*/
        this.maximo = 0;
        this.botonCerrarFinalizaVenta.nativeElement.click();
        this.loader = false;        
        this.router.navigate(['/ingresar-venta']);
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }

  generarVenta() {
    console.log('generar compra')
    this.venta.total = this.getTotal();
  }

  finalizarVenta({ value, valid }: NgForm) {
    console.log('generar venta...')
    this.loader = true
    this.venta.credito = 0;
    if (this.selectedOpcionPago == 'credito') {
      this.venta.credito = 1;
      let fechaEnvio = this.venta.creditoFecha + "T00:00:00";
      this.venta.creditoFecha = fechaEnvio;
      //la fecha es seteada directamente en el coponente
    } else {//Pago contado
      this.venta.pagoTipo = this.selectedTipoPago;
    }
    this.ventaService.generarVenta(this.venta, this.detallesVentas).subscribe(
      response => {
        console.log(response);
        this.detallesVentas = [];
        this.venta = {};
        this.clientes[-1];
        this.cliente = {
          rut: undefined,
          digito: '',
          nombre: '',
          paterno: '',
          materno: '',
          direccion: '',
          comuna: '',
          telefono: '',
          mail: ''
        };
        this.maximo = 0;
        this.botonCerrarFinalizaVenta.nativeElement.click();
        this.loader = false;
        this.selectedTipoPago = 'seleccione'
        this.selectedOpcionPago = 'seleccione'
        this.router.navigate(['/ingresar-venta']);
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }



  highlight(row: Articulo) {
    console.log(row)
    if (row.id != undefined) {
      this.selectedRowIndex = row.id;
      this.articuloSelected = row;
    }
  }

  resetDialogArticulos() {
    this.cantidadIngresada = 0;
    this.articuloSelected;
    this.articuloSelected = {
      id: undefined
    };
  }

  activarJobs() {
    //this.timerId = setInterval(() => this.getProductoCargado(), 2000);   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  /*desactivarJobs() {
    clearTimeout(this.timerId);
  }
  */
  getAllClientes() {
    this.clienteService.getAll().subscribe(
      response => {
        console.log(response);
        this.clientes = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  selecionarArticulo() {
    if (this.articuloSelected && this.cantidadIngresada) {
      this.loader = true
      //this.articulosVenta.push(this.articuloSelected);
      let detalleVenta = new DetalleVenta();
      detalleVenta.idVenta = this.maximo;
      detalleVenta.cantidad = this.cantidadIngresada;
      detalleVenta.idArticulo = this.articuloSelected.id;
      detalleVenta.precio = this.articuloSelected.precio_venta;
      detalleVenta.articuloDescripcion = this.articuloSelected.claseDescripcion;
      this.detalleVentaService.agregarDetalleVenta(detalleVenta).subscribe(
        response => {
          console.log(response);
          this.getAllDetalleArticuloByIdVenta();
          this.loader = false
        },
        error => {
          console.log(error);
          this.loader = false
        }
      );
      //this.detalleVenta.push(detalleVenta)
      this.cerrarModal();
      /*let producto = this.cuentas.find(x => x.id == this.productoSelected);
      this.detalleFactura = new DetalleFactura();
      this.detalleFactura.codigoProducto=producto?.codigo;
      this.detalleFactura.precio=Number(producto?.precio);
      */
    }
  }
  getAllDetalleArticuloByIdVenta() {
    this.loader = true
    console.log("Cargando getAllDetalleArticuloByIdVenta...");
    this.detalleVentaService.getAllDetalleArticuloByIdVenta(this.venta.id!).subscribe(
      response => {
        console.log(response);
        this.detallesVentas = response['payload'];
        this.detallesVentas.forEach(detalle => {
          if (detalle.idArticulo != null) {
            let obj = this.articulos.find(x => x.id == detalle.idArticulo);
            detalle.articuloDescripcion = obj?.nombre;
          }
        })
        this.loader = false
      },
      error => {
        console.log(error);
        this.loader = false
      }
    );
  }


  selecionarProducto({ value, valid }: NgForm) {
    if (!valid) {

    } else {
      //this.detalleFacturas.push(new DetalleFactura(value.id, this.factura.id ,value.codigoProducto,value.precio,value.cantidad));
      this.detalleFacturaForm.resetForm();
      this.cerrarModal();
    }

  }

  selecionarClase() {
    this.clase = this.claseSelected;
  }

  // guardarFactura({value, valid}: NgForm){
  //   if(!valid){

  //   } else {
  //     //Agregando factura, su detalle      
  //     this.detalleFacturaService.agregarDetalleFactura(this.detalleFacturas).subscribe((detalleFactura: DetalleFactura[])=>{
  //       let numero = this.factura.cuentaId;
  //       console.log(detalleFactura);  
  //       //this.getAll();
  //       let total = 0;
  //       detalleFactura.forEach(detalle => {
  //         if (detalle.cantidad!=null && detalle.precio!=null ){
  //           total += detalle.cantidad * detalle.precio;
  //         }

  //       });

  //       this.factura = new Movimientos();        
  //      /* this.factura.rutProveedor = this.proveedorSelected.rut;
  //       this.factura.rutUsuario =  14174461;
  //       this.factura.total =  total;
  //       this.factura.numeroFactura =  numero;
  //       this.movimientoService.agregarFactura(this.factura).subscribe((data: any)=>{
  //         console.log("Guardando proveedor...");
  //         this.router.navigate(['/facturas']);
  //       },  
  //         (error)=> console.log(error)
  //       );
  //       */
  //     }, 
  //     (error)=>{this.onErrorHandle();
  //     });
  //     this.detalleFacturaForm.resetForm();
  //     this.cerrarModal();

  //   }
  // }

  /*   getAll(){
      console.log("Cargando detalle productos...");
      this.detalleVentaService.getAllFDetalleVenta().subscribe(
        response => {
          console.log(response);
          this.detalleFacturas = response;
          this.totalRowsFiltered = this.detalleFacturas.length;
        },
        error =>{
          console.log(error);
        }
      );
    } */

  /* getProductoCargado(){    
    this.articuloService.getAllProductosCargados().subscribe(
      response => {
        console.log(response); 
        //this.detalleFactura = response.payload;
        this.productoSelected = response.payload.codigo;
        //this.onSelected();
        //this.desactivarJobs();
      },
      error =>{
        console.log(error);
        //this.desactivarJobs();
      }
    );
  }
 */

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

  /* getAllClases(){
    this.proveedorService.getAll().subscribe(
      response => {
        console.log(response);
       // this.clases = response;        
      },
      error =>{
        console.log(error);
      }
    );
  } */

  editar(factura: DetalleFactura) {
    this.detalleFacturaForm.setValue(factura);
  }

  agregar({ value, valid }: NgForm) {
    if (!valid) {

    }
    else {
      //Agregar el nuevo            
      this.detalleVentaService.agregarDetalleVenta(value).subscribe((data: any) => {
        console.log(data);
        //this.getAll();

      },
        (error) => {
          this.onErrorHandle();
        });
      this.detalleFacturaForm.resetForm();
      this.cerrarModal();

    }
  }

  cerrarModal() {
    //this.desactivarJobs();
    this.selectedRowIndex=0;
    this.botonCerrar.nativeElement.click();
  }

  borrar(detalleVenta: DetalleFactura) {
    /* const index: number = this.detallesVentas.indexOf(detalleVenta);
    if (index !== -1) {
        this.detallesVentas.splice(index, 1);
    }     */

    if (detalleVenta.id != undefined) {
      this.detalleVentaService.eliminar(detalleVenta).subscribe(
        (data: any) => {
          console.log(data);
          this.getAllDetalleArticuloByIdVenta();
        },
        (error) => {
          this.onErrorHandle();
        });
    }
  }

  selecionarCliente() {
    /*if (this.proveedorSelected!== undefined){
      let proveedor = this.proveedores.find(x => x.rut == Number(this.proveedorSelected.rut));*/
    this.cliente = this.clienteSelected;
    /*}*/
  }

  getTotal() {
    let saldoTotal: number = 0;
    if (this.detallesVentas) {
      this.detallesVentas.forEach(detalle => {
        if (detalle.cantidad != null && detalle.precio != null) {
          saldoTotal += detalle.cantidad * detalle.precio;
        }
      });
    }
    return saldoTotal;
  }

  /*pop up */
  showDialog(detalle: DetalleVenta) {
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {
      that.borrar(detalle);
    }, function () {
      console.log("Cierre pop up opcion NO");
    })
  }

  showDialogIniciarVenta() {
    let that = this;
    this.confirmationDialogService.confirmThis("Desea iniciar la venta?", function () {
      //that.borrar(detalle);
    }, function () {
      console.log("Cierre pop up opcion NO");
    })
  }

  /* fin pop up */
  changePageSize(pageSize: number): void {
    this.page = 1;
    this.pageSize = pageSize;
    this.lastPage = Math.ceil(this.totalRowsFiltered / this.pageSize);
  }

  changePage(page: number): void {
    this.page = page;
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
  /* show = false; 
  ngAfterViewChecked() {
    let show = this.isShowExpand();
    if (show != this.show) { // check if it change, tell CD update view
      this.show = show;
      this.cdRef.detectChanges();
    }
  } */

}