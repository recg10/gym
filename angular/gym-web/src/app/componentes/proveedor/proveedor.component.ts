import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Cliente } from './../../modelo/cliente.model';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Proveedor } from 'src/app/modelo/proveedor.model';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(private service: ProveedorService,    
    private confirmationDialogService: ConfirmDialogService,
    private router: Router,) { }

  clientes!: Proveedor[];
  cliente: Proveedor = {
    rut: 0,
    nombre: '',    
    digito: '',
    direccion: '',
    //comuna: '',
    telefono: ''
    //mail: ''
  }

  //spinner
  loader: Boolean=false;

  columnas: string[] = ['rut','digito','nombre', 'direccion','comuna', 'telefono','mail','acción'];
  dataSource = new MatTableDataSource<Cliente>;

  @ViewChild("proveedorForm")
  proveedorForm!: NgForm;
  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {      
    this.dataSource.paginator = this.paginator;    
    this.dataSource.filterPredicate = this.filterByNombre();
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    this.getAll();
  }

  onErrorHandle(): void{
    console.log("Error");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  filterByNombre() {
    let filterFunction = (data: Proveedor, filter: any): boolean => {
      if (filter) {
        const nombre = data.nombre;
        if ( nombre ){          
          if (nombre.indexOf(filter) != -1) {
            return true;
          }else{
            return false;
          }
        }        
        return false;
      } else {
        return true;
      }
    };
    return filterFunction;
  }

  getAll(){
    this.loader=true;
    this.service.getAll().subscribe(
      response => {
        console.log(response);
        this.clientes = response;
        this.dataSource = new MatTableDataSource<Proveedor>(this.clientes);        
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.filterByNombre();
        this.loader=false;
      },
      error =>{
        console.log(error);
      }
    );
  }

  editar (cliente: Proveedor){
    this.proveedorForm.setValue(cliente);
  }
  
  reset (){
    this.proveedorForm.resetForm();
  }

  agregar({value, valid}: NgForm){
    this.loader=true;    
    if(!valid){      
    }
    else{
      //Agregar el nuevo cliente      
      this.service.agregar(value);
      this.service.agregar(value).subscribe((data: any)=>{
        console.log(data);  
        this.getAll();
        this.loader=false;
      }, 
      (error)=>{
        this.onErrorHandle();
        this.loader=false;
      });
      this.proveedorForm.resetForm();
      this.cerrarModal();
      this.loader=false;     
    }
  }

  borrar(cliente: Proveedor){
    if (cliente.rut!=undefined){
        this.loader=true;
        this.service.eliminar(cliente).subscribe((data: any)=>{
          console.log(data);  
          this.getAll();
          this.loader=false;
        }, 
        (error)=>{
          this.onErrorHandle();
          this.loader=false;
        });
      }
    }  

  private cerrarModal(){    
    this.botonCerrar.nativeElement.click();
  }

  /*pop up */
  showDialog(cliente: Proveedor) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
      that.borrar(cliente);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }  

  /* fin pop up */

}
