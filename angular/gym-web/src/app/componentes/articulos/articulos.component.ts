import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';
import { ArticuloService } from '../../servicios/articulo.service';
import { Articulo } from 'src/app/modelo/articulo.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ClaseService } from 'src/app/servicios/clase.service';
import { Clase } from 'src/app/modelo/clase.model';
import { UtilMailService } from './../../servicios/util-mail.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements AfterViewInit  {

  constructor(private articuloService: ArticuloService,
    private claseService: ClaseService,
    private confirmationDialogService: ConfirmDialogService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private utilMailService: UtilMailService) { }

    ngAfterViewInit() {      
      this.dataSource.paginator = this.paginator;      
    }

    //spinner
    loader: Boolean=false;

    articulos!: Articulo[];
    articulo: Articulo = {
    id: 0,
    //codigo: '',
    nombre: '',    
    codBarras: '' ,    
    //claseId: 0,
    //claseDescripcion: '',
    //marca: '',
    precio_venta: 0,
    stock: 0,
    stock_min: 0
  }

  clases: Clase[] = [];
  claseSelected!: Clase;
  clase1: Clase = {
    id: 0,
    descripcion: ''
  }

  //columnas: string[] = ['codigo', 'nombre', 'claseDescripcion', 'codBarras', 'precio_venta','stock','stock_min','acción'];
  columnas: string[] = ['nombre', 'codBarras', 'precio_venta','stock','stock_min','acción'];
  dataSource = new MatTableDataSource<Articulo>; 

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  @ViewChild("productoForm")
  productoForm!: NgForm;

  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  errorMessage:any;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    this.loader=true;
    this.getAllClases();
    this.articuloService.getAll().subscribe(
      response => {        
        console.log(response);
        this.articulos = response;
        this.dataSource = new MatTableDataSource<Articulo>(this.articulos);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.filterByNombre();
        //this.dataSource.sort = this.sort;
        this.loader=false;
        //this.totalRowsFiltered = this.cuentas.length;
      },
      error =>{
        this.loader=false;
        console.log(error);
      }
    );
    
  }

  callUrlExcel(){
  
      // Crear la hoja de trabajo a partir del JSON
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.articulos);
      // Crear el libro de trabajo y añadir la hoja
      const workbook: XLSX.WorkBook = { 
        Sheets: { 'Datos': worksheet }, 
        SheetNames: ['Datos'] 
      };
      // Guardar y descargar el archivo con un nombre específico
      XLSX.writeFile(workbook, 'reporte-datos.xlsx');
    }
  

  informarStockCritico(){
    this.loader=true;    
    this.articuloService.sendMail().subscribe(
      response => {
        console.log(response);
        this.loader=false;
      },
      error =>{
        this.loader=false;
        console.log(error);
      }
    );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

    filterByNombre() {
    let filterFunction = (data: Articulo, filter: any): boolean => {
      if (filter) {
        const nombre = data.nombre;
        if ( nombre ){
          /*for (let i = 0; i < nombre.length; i++) {
            if (nombre[i].indexOf(filter) != -1) {
              return true;
            }
          }
          return false;*/
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

  onErrorHandle(error: any): void{
    console.log("Error");
    this.errorMessage=error.error.messageSPF;
    setTimeout( () => {          
      this.errorMessage=undefined;
    }, 10000);
  }

  selecionarClase(){    
    this.clase1=this.claseSelected;
  }

  onSelected(){
    if (this.claseSelected!== undefined ){
      this.clase1 != this.clases.find(x => x.id == Number(this.claseSelected.id));
    } 
  }

  sortData(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllClases (){    
    this.claseService.getAll().subscribe(
      response => {
        console.log(response);
        this.clases = response;
      },
      error =>{
        this.loader=false;
        console.log(error);
      }
    );
  }

  getAll(){
    this.loader=true;
    this.articuloService.getAll().subscribe(
      response => {
        console.log(response);
        this.articulos = response;
        this.dataSource = new MatTableDataSource<Articulo>(this.articulos);        
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.filterByNombre();
        this.loader=false;
      },
      error =>{
        this.loader=false;
        console.log(error);
      }
    );
  }

  editar (articulo: Articulo){
    this.articulo = { ...articulo };

    if (articulo.claseId !== undefined) {
      const clase = this.clases.find(x => x.id == articulo.claseId);
      this.clase1 = { id: clase?.id ?? 0, descripcion: clase?.descripcion ?? '' };
    }

    if (this.productoForm && this.productoForm.form) {
      this.productoForm.form.patchValue(this.articulo);
    }
  }

  reset (){
    this.productoForm.resetForm();
  }

  agregar({value, valid}: NgForm){
    this.loader=true;
    if(!valid){
      this.loader=false;
    }
    else{
      //Agregar el nuevo    
      this.articuloService.agregar(value).subscribe((data: any)=>{
        console.log(data);  
        this.getAll();  
        this.loader=false;
      }, 
      (error)=>{
        this.onErrorHandle(error);
        this.loader=false;

      });
      this.productoForm.resetForm();
      this.cerrarModal();
      this.loader=false;     
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  borrar(articulo: Articulo){
    this.loader=true;
    if (articulo.id!=undefined){
        this.articuloService.eliminar(articulo).subscribe(
          (data: any)=>{
          console.log(data);  
          this.getAll();
          this.loader=false;
        }, 
        (error)=>{
          this.loader=false;
          this.onErrorHandle(error);          
        });
      }
    }  

  /*pop up */
  showDialog(articulo: Articulo) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
       that.borrar(articulo);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }
/* fin pop up */

}
