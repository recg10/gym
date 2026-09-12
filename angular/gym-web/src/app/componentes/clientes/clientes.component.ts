import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Cliente } from './../../modelo/cliente.model';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService,
    private router: Router,
    private confirmationDialogService: ConfirmDialogService) { }

  clientes!: Cliente[];
  cliente: Cliente = {
    rut: 0,
    nombre: '',
    paterno: '',
    materno: '',
    digito: '',
    direccion: '',
    comuna: '',
    telefono: '',
    mail: ''
  }

  //spinner
  loader: Boolean=false;

  columnas: string[] = ['rut','digito','nombre', 'paterno', 'materno', 'direccion', 'telefono','mail','acción'];
  dataSource = new MatTableDataSource<Cliente>;

  @ViewChild("clienteForm")
  clienteForm!: NgForm;
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
    let filterFunction = (data: Cliente, filter: any): boolean => {
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
    this.clienteService.getAll().subscribe(
      response => {
        console.log(response);
        this.clientes = response;
        this.dataSource = new MatTableDataSource<Cliente>(this.clientes);        
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.filterByNombre();
        this.loader=false;
      },
      error =>{
        console.log(error);
      }
    );
  }

  editar (cliente: Cliente){
    this.clienteForm.setValue(cliente);
  }
  
  reset (){
    this.clienteForm.resetForm();
  }

  agregar({value, valid}: NgForm){
     
    if(!valid){      
    }
    else{
      this.loader=true;   
      //Agregar el nuevo cliente      
      //this.usuarioService.agregar(value);
      this.clienteService.agregar(value).subscribe((data: any)=>{
        console.log(data);  
        this.getAll();
        this.loader=false;
      }, 
      (error)=>{
        this.onErrorHandle();
        this.loader=false;
      });
      this.clienteForm.resetForm();
      this.cerrarModal();
      this.loader=false;     
    }
  }

  borrar(cliente: Cliente){
    if (cliente.rut!=undefined){
        this.loader=true;
        this.clienteService.eliminar(cliente).subscribe(
          (data: any)=>{
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
  showDialog(cliente: Cliente) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
      that.borrar(cliente);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }  

  /* fin pop up */

}
