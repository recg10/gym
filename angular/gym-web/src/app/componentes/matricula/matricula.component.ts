import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from '../../servicios/confirm-dialog.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { Matricula } from 'src/app/modelo/matricula.model';
import { Plan } from 'src/app/modelo/plan.model';
import { PlanService } from 'src/app/servicios/plan.service';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Alumno } from 'src/app/modelo/alumno.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarAsistenciaDialogComponent } from '../registrar-asistencia-dialog/registrar-asistencia-dialog.component';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  constructor(private matriculaService: MatriculaService,
    private alumnoService: AlumnoService,    
    private confirmationDialogService: ConfirmDialogService,
    private planService: PlanService,
    private router: Router,
    private dialog: MatDialog) { }

    loader: Boolean=false;  
    matriculas!: Matricula[];
    columnas: string[] = [
      'accion', 'alumnoRut',
      'alumnoNombre', 'alumnoPaterno', 'alumnoMaterno', 'fechaInicio',
      'fechaVencimiento', 'diasContratados', 'diasUtilizados', 'usuarioRut', 'tipo', 'tipoPlan'
    ];
    dataSource = new MatTableDataSource<Matricula>();
    matricula: Matricula = {
    id: 0,
    idTipoPlan: 0,
    fechaInicio: '',
    usuarioRut: '',
    alumnoRut: '',
    diasContratados: 0,
    diasUtilizados: 0,    
    fechaVencimiento: '',
    tipoPlan: '',
    activa: false,
    tipo: '',
    valor: 0
  }

  plan: Plan = {
    id: 0,    
    nombre: '',
    precio:0,
    dias:0
  };

  optionsAlumnos: Alumno[] = [];
  filteredOptions: Alumno[] = [];

  planes: Plan[] = [];
  planSelected!: Plan;
  
  alumnoSearchTerm: string = '';
  showAlumnoResults: boolean = false;

  alumnoSeleccionado: Alumno = {
    rut: '',
    nombre: '',
    paterno: '',
    materno: '',
    direccion: '',
    telefono: '',
    fechaNacimiento: '',
    email: '',    
  }

  @ViewChild("matriculaForm")
  matriculaForm!: NgForm;

  @ViewChild("renovarForm")
  renovarForm!: NgForm;

  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  @ViewChild("botonRenovacionCerrar")
  botonRenovacionCerrar!: ElementRef;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  readonly timemOut=2000;
  msgError="";

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');    
    if (usuario==null){
      this.router.navigate(['/']);
    } 
    this.getAll();
    this.getAllPlanes();
    this.getAllAlumnos();    
  }

  onSearch(query: string) {
    const value = query.toLowerCase().trim();
    this.showAlumnoResults = true;
    if (!value) {
      this.filteredOptions = this.optionsAlumnos;
      return;
    }

    this.filteredOptions = this.optionsAlumnos.filter(opt => {
      const rut = opt.rut?.toLowerCase() || '';
      const nombre = opt.nombre?.toLowerCase() || '';
      const paterno = opt.paterno?.toLowerCase() || '';
      const materno = opt.materno?.toLowerCase() || '';
      return rut.includes(value) || nombre.includes(value) || paterno.includes(value) || materno.includes(value);
    });
  }

  onAlumnoFocus() {
    this.showAlumnoResults = true;
    if (!this.alumnoSearchTerm?.trim()) {
      this.filteredOptions = this.optionsAlumnos;
      return;
    }
    this.onSearch(this.alumnoSearchTerm);
  }

  selectAlumno(alumno: Alumno) {
    this.alumnoSeleccionado = alumno;
    this.matricula.alumnoRut = alumno.rut || '';
    this.alumnoSearchTerm = alumno.rut || '';
    this.filteredOptions = this.optionsAlumnos;
    this.showAlumnoResults = false;
  }

  onErrorHandle(error: any): void{
    console.log("Error");    
  }

  getAllPlanes(){
    this.planService.getAllPlans().subscribe(
      response => {
        console.log(response);
        this.planes = response;
      },
      error =>{
        console.log(error);
      }
    );
  }

  getAllAlumnos(){
    this.alumnoService.getAllAlumnos().subscribe(
      response => {
        console.log(response);        
        this.optionsAlumnos = response;
        this.filteredOptions = this.optionsAlumnos;
      },
      error =>{
        console.log(error);
      }
    );
  }

  getAll(){
    this.matriculaService.getAllMatriculas().subscribe(
      response => {
        console.log(response);
        this.matriculas = response;
        this.dataSource = new MatTableDataSource<Matricula>(response);
        this.dataSource.paginator = this.paginator;
      },
      error =>{
        console.log(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  getClaseFilaMatricula(matricula: Matricula): string {
    const diasContratados = Number(matricula.diasContratados ?? 0);
    const diasUtilizados = Number(matricula.diasUtilizados ?? 0);
    const diferencia = diasContratados - diasUtilizados;

    if (diferencia >= 3) {
      return 'fila-verde';
    }

    if (diferencia >= 1) {
      return 'fila-amarillo';
    }

    return 'fila-rojo';
  }

  editar (matricula: Matricula){
    let that = this;
    that.matricula = matricula;
    this.matricula.tipo= "modificar";
    that.planSelected = that.planes.find(plan => plan.id === matricula.idTipoPlan) || that.planSelected;    
    that.alumnoSeleccionado = that.optionsAlumnos.find(alumno => alumno.rut === matricula.alumnoRut) || that.alumnoSeleccionado;
    this.selecionarPlan();
    that.matriculaForm.setValue(matricula);
  }

  guardarEditar({value, valid}: NgForm){
    if(!valid){
    }
    else{      
      const usuarioJson = localStorage.getItem('usuario');
      this.matricula.usuarioRut = usuarioJson ? JSON.parse(usuarioJson).rut : '1-9';            
      this.matriculaService.agregar(this.matricula).subscribe((data: any)=>{
        console.log(data);  
        this.getAll();       
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.matriculaForm.resetForm();
      this.cerrarModal();
    }
  }

  agregar({value, valid}: NgForm){
    if(!valid){
     
    }
    else{
      //Agregar matricula
      const usuarioJson = localStorage.getItem('usuario');
      this.matricula.usuarioRut = usuarioJson ? JSON.parse(usuarioJson).rut : '1-9';
      if  (this.matricula.tipo!='modificar'){
        this.matricula.tipo= "Matricula";
        this.matricula.activa= true;
      }      
      this.matriculaService.agregar(this.matricula).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();       
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.matriculaForm.resetForm();
      this.cerrarModal();      
    }
  }

  renovar({value, valid}: NgForm){   
      //renovar matricula
      const usuarioJson = localStorage.getItem('usuario');
      this.matricula.usuarioRut = usuarioJson ? JSON.parse(usuarioJson).rut : '1-9';
      this.matricula.tipo= "Renovacion";
      this.matricula.id= 0;
      this.matricula.activa= true;
      this.matriculaService.agregar(this.matricula).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();
        this.renovarForm.resetForm();
        this.botonRenovacionCerrar.nativeElement.click();
      }, 
      (error)=>{
        this.onErrorHandle(error);
        console.log(error);
        this.msgError=error.error.messageSPF;
      });     
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  registrarAsistencia(matricula: Matricula): void {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const fechaEnvio = localDate.toISOString();

    this.dialog.open(RegistrarAsistenciaDialogComponent, {
      data: {
        rut: matricula.alumnoRut,
        selectedDate: fechaEnvio
      }
    }).afterClosed().subscribe(result => {
      if (result && !result.error) {
        this.getAll();
      }
    });
  }

  borrar(matricula: Matricula){
    if (matricula.id!=undefined){
        this.matriculaService.eliminar(matricula).subscribe(
          (data: any)=>{
          console.log(data);  
          this.getAll();
        }, 
        (error)=>{this.onErrorHandle(error);
        });
      }
    }


  selecionarPlan() {
    this.plan = this.planSelected;
    this.matricula.idTipoPlan = this.plan.id;
    this.matricula.diasContratados = this.plan.dias;
    this.matricula.valor = this.plan.precio;
    this.matricula.diasUtilizados = 0;
    this.matricula.fechaInicio = new Date().toISOString().split('T')[0];
    const date = new Date(); // Current date
    date.setMonth(date.getMonth() + 1);
    this.matricula.fechaVencimiento = date.toISOString().split('T')[0];
  }

  /*pop up */
  showDialog(matricula: Matricula) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro de eliminar este registro?", function () {  
       that.borrar(matricula);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }

    showDialogRenovacion (matricula: Matricula){
      let that = this;
      that.matricula = matricula;
      that.planSelected = that.planes.find(plan => plan.id === matricula.idTipoPlan) || that.planSelected;
      this.selecionarPlan();
      this.msgError="";
  }  
}