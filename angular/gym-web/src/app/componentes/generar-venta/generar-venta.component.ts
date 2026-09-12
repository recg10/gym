import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/modelo/articulo.model';
import { Cliente } from 'src/app/modelo/cliente.model';
import { DetalleVenta } from 'src/app/modelo/detalle.venta.model';
import { Venta } from 'src/app/modelo/venta.model';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DetalleVentaService } from 'src/app/servicios/detalle-venta.service';
import { VentaService } from 'src/app/servicios/venta.service';
import { rutValidator } from 'src/app/util/validador.rut';

@Component({
  selector: 'app-generar-venta',
  templateUrl: './generar-venta.component.html',
  styleUrls: ['./generar-venta.component.css']
})
export class GenerarVentaComponent implements OnInit {

  articulos: Articulo[] = [];
  articulosFiltrados: Articulo[] = [];
  clientes: Cliente[] = [];
  detallesVentas: DetalleVenta[] = [];
  articuloSeleccionado!: Articulo;
  clienteSeleccionado!: Cliente;
  cantidad = 1;
  total = 0;
  totalDia = 0;
  loader = false;
  mensaje = '';
  ventaId = 0;
  filtroArticulo = '';
  mostrarDialogoPago = false;
  tipoPagoSeleccionado = '';
  rutClienteIngreso = '';
  mensajeErrorRut = '';

  venta: Venta = {
    id: 0,
    rutCliente: 0,
    total: 0,
    fecha: '',
    rutUsuario: 1,
    boleta: 0,
    credito: 0,
    pagoTipo: 'contado'
  };

  constructor(
    private readonly router: Router,
    private readonly articuloService: ArticuloService,
    private readonly clienteService: ClienteService,
    private readonly ventaService: VentaService,
    private readonly detalleVentaService: DetalleVentaService,
  ) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario === null) {
      this.router.navigate(['/']);
      return;
    }

    this.cargarArticulos();
    //this.cargarClientes();
    this.getTotalDia() ;
  }

  cargarArticulos(): void {
    this.loader = true;
    this.articuloService.getAll().subscribe({
      next: (response) => {
        this.articulos = response;
        this.articulosFiltrados = response;
        this.loader = false;
      },
      error: () => {
        this.loader = false;
        this.mensaje = 'No se pudieron cargar los artículos.';
      }
    });
  }

    getTotalDia(): void {
        this.loader = true;
        const now = new Date();
        const offset = now.getTimezoneOffset(); // Obtiene diferencia en minutos
        const localDate = new Date(now.getTime() - (offset * 60 * 1000));
        const fecha = localDate.toISOString().slice(0, 10);
        this.ventaService.monitorVenta(fecha).subscribe({
        next: (response) => {
            response.payload.forEach((obj: any) => {
            this.totalDia += obj.total !== null && !isNaN(obj.total) ? Number(obj.total) : 0; // Asegura que payload tenga un valor numérico
        });
        this.loader = false;
        }, 
        error: () => {
            this.loader = false;
            this.mensaje = 'No se pudo obtener el total del día.';
        }
    });
    
  }

  /* cargarClientes(): void {
    this.clienteService.getAll().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar los clientes.';
      }
    });
  } */

  seleccionarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = articulo;
    this.cantidad = 1;
  }

  filtrarArticulos(): void {
    const texto = this.filtroArticulo.toLowerCase().trim();
    if (!texto) {
      this.articulosFiltrados = this.articulos;
      return;
    }

    this.articulosFiltrados = this.articulos.filter((articulo) => {
      const nombre = articulo.nombre?.toLowerCase() ?? '';
      const codigo = articulo.codigo?.toLowerCase() ?? '';
      return nombre.includes(texto) || codigo.includes(texto);
    });
  }

  agregarArticulo(): void {
    if (!this.articuloSeleccionado?.id ) {
      this.mensaje = 'Debe seleccionar un cliente y un artículo.';
      return;
    }

    if (!this.ventaId) {
      this.iniciarVenta();
      return;
    }

    this.guardarDetalle();
  }

  iniciarVenta(): void {
    this.loader = true;
    this.ventaService.getMaximo().subscribe({
      next: (response) => {
        const maximo = response?.payload ?? response;
        this.venta.id = Number(maximo) + 1;
        //this.venta.rutCliente = this.clienteSeleccionado.rut;
        //this.venta.rutUsuario = 1;
        this.venta.total = 0;
        this.ventaId = this.venta.id;
        this.ventaService.save(this.venta).subscribe({
          next: () => {
            this.guardarDetalle();
          },
          error: () => {
            this.loader = false;
            this.mensaje = 'No se pudo iniciar la venta.';
          }
        });
      },
      error: () => {
        this.loader = false;
        this.mensaje = 'No se pudo obtener el folio de venta.';
      }
    });
  }

  guardarDetalle(): void {
    const detalle = new DetalleVenta();
    detalle.idVenta = this.ventaId;
    detalle.idArticulo = this.articuloSeleccionado.id;
    detalle.cantidad = this.cantidad;
    detalle.precio = this.articuloSeleccionado.precio_venta;
    detalle.articuloDescripcion = this.articuloSeleccionado.nombre;

    this.loader = true;
    this.detalleVentaService.agregarDetalleVenta(detalle as any).subscribe({
      next: () => {
        //this.detallesVentas.push(detalle);
        this.detalleVentaService.getAllDetalleArticuloByIdVenta(this.ventaId).subscribe({
          next: (response) => {
            this.detallesVentas = response['payload'];
            this.detallesVentas.forEach(detalle => {
              if (detalle.idArticulo != null) {
                let obj = this.articulos.find(x => x.id == detalle.idArticulo);
                detalle.articuloDescripcion = obj?.nombre;
              }
            });
            this.cargarArticulos();
            this.actualizarTotal();
            this.totalDia += (detalle.precio ?? 0) * (detalle.cantidad ?? 0);
            this.loader = false;
            this.mensaje = 'Artículo agregado correctamente.';
          }
        });
      },
      error: () => {
        this.loader = false;
        this.mensaje = 'No se pudo agregar el artículo.';
      }
    });
  }

  actualizarTotal(): void {
    this.total = this.detallesVentas.reduce((sum, item) => {
      const precio = item.precio ?? 0;
      const cantidad = item.cantidad ?? 0;
      return sum + (precio * cantidad);
    }, 0);
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

  onErrorHandle(): void {
        console.log("Error");
    }

  eliminarDetalle(detalle: DetalleVenta): void {

    const index = this.detallesVentas.findIndex((item) => item.idArticulo === detalle.idArticulo && item.idVenta === detalle.idVenta);
    if (index === -1) {
      return;
    }

    if (detalle.id != undefined) {
      this.detalleVentaService.eliminar(detalle).subscribe(
        (data: any) => {
          console.log(data);
          this.getAllDetalleArticuloByIdVenta();
          this.cargarArticulos();
        },
        (error) => {
          this.onErrorHandle();
        });
    }

    const itemEliminado = this.detallesVentas[index];
    const subtotal = (itemEliminado.precio ?? 0) * (itemEliminado.cantidad ?? 0);

    this.detallesVentas.splice(index, 1);
    this.actualizarTotal();
    this.totalDia = Math.max(0, this.totalDia - subtotal);

    const articulo = this.articulos.find((x) => x.id === itemEliminado.idArticulo);
    if (articulo) {
      articulo.stock = (articulo.stock ?? 0) + (itemEliminado.cantidad ?? 0);
    }

    this.mensaje = 'Artículo eliminado del detalle.';
  }

    showDialog(): void {
      if (this.detallesVentas.length === 0) {
        this.mensaje = 'Agregue al menos un artículo.';
        return;
      }

      this.tipoPagoSeleccionado = this.venta.pagoTipo ?? '';
      this.mostrarDialogoPago = true;
    }

    cerrarDialogoPago(): void {
      this.mostrarDialogoPago = false;
    this.rutClienteIngreso = '';
    this.mensajeErrorRut = '';
  }

  formatearRut(rut: string): string {
    if (!rut) return '';
    
    // Remover caracteres especiales y convertir a mayúsculas
    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    
    // Si es muy corto, retornar como está
    if (limpio.length < 2) return limpio;
    
    // Separar el cuerpo del dígito verificador
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    
    // Formatear como XXXXXXXX-X (8 dígitos - 1 dígito verificador)
    if (cuerpo.length <= 8) {
      return cuerpo.length > 0 ? (cuerpo.length < 8 ? cuerpo : cuerpo + '-' + dv) : '';
    } else {
      return cuerpo.slice(0, 8) + '-' + dv;
    }
  }

  validarRut(rut: string): boolean {
    if (!rut || rut.trim() === '') {
      this.mensajeErrorRut = 'El RUT es requerido';
      return false;
    }

    // Limpiar el RUT
    const valor = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (valor.length < 2) {
      this.mensajeErrorRut = 'El RUT debe tener al menos 2 caracteres';
      return false;
    }

    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);

    // Validar que el cuerpo sea solo números
    if (!/^\d+$/.test(cuerpo)) {
      this.mensajeErrorRut = 'El RUT debe contener solo números (excepto el dígito verificador)';
      return false;
    }

    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
      suma += parseInt(cuerpo.charAt(cuerpo.length - i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    if (dv !== dvCalculado) {
      this.mensajeErrorRut = `RUT inválido. El dígito verificador correcto es ${dvCalculado}`;
      return false;
    }

    this.mensajeErrorRut = '';
    return true;
  }

  onRutInput(event: any): void {
    const valorFormato = this.formatearRut(event.target.value);
    this.rutClienteIngreso = valorFormato;
    
    // Validar en tiempo real solo si tiene el formato completo
    if (this.rutClienteIngreso.includes('-')) {
      this.validarRut(this.rutClienteIngreso);
    } else {
      this.mensajeErrorRut = '';
    }
  }

  finalizarVenta(): void {
    if (this.detallesVentas.length === 0) {
      this.mensaje = 'Agregue al menos un artículo.';
      return;
    }

    if (!this.tipoPagoSeleccionado) {
      this.mensaje = 'Seleccione una forma de pago.';
      return;
    }

    // Validar RUT del cliente
    if (!this.validarRut(this.rutClienteIngreso)) {
      return;
    }

    this.venta.total = this.total;
    this.venta.pagoTipo = this.tipoPagoSeleccionado;
    this.venta.credito = this.tipoPagoSeleccionado === 'credito' ? 1 : 0;
    
    // Extraer solo los números del RUT para guardar
    const rutNumerico = this.rutClienteIngreso.replace(/[^0-9]/g, '');
    this.venta.rutCliente = parseInt(rutNumerico, 10);
    
    this.mostrarDialogoPago = false;
      let usuario = JSON.parse(localStorage.getItem('usuario')!);
      let rut = usuario.rut.split('-')[0];
      this.venta.rutUsuario = rut;
    //this.venta.rutCliente = this.clienteSeleccionado.rut;
    this.loader = true;
    this.ventaService.generarVenta(this.venta, this.detallesVentas).subscribe({
      next: () => {
        this.loader = false;
        this.mensaje = 'Venta registrada correctamente.';
        this.detallesVentas = [];
        this.total = 0;
        this.ventaId = 0;
        this.venta = { id: 0, rutCliente: 0, total: 0, fecha: '', rutUsuario: 1, boleta: 0, credito: 0, pagoTipo: 'contado' };
        this.tipoPagoSeleccionado = '';
        this.articuloSeleccionado = undefined as any;
        this.clienteSeleccionado = undefined as any;
      },
      error: () => {
        this.loader = false;
        this.mensaje = 'No se pudo finalizar la venta.';
      }
    });
  }
}
