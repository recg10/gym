import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../modelo/usuario.model';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from '../../servicios/confirm-dialog.service';
import { Alumno } from 'src/app/modelo/alumno.model';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  constructor(private alumnoService: AlumnoService,    
    private confirmationDialogService: ConfirmDialogService,
    private router: Router) { }

    //spinner
    loader: Boolean=false;
    alumnos!: Alumno[];
    alumno: Alumno = {
    rut: '',
    nombre: '',
    paterno: '',
    materno: '',
    direccion: '',
    telefono: '',
    fechaNacimiento: '',
    email: '',    
  }

  @ViewChild("alumnoForm")
  alumnoForm!: NgForm;
  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  readonly timemOut=2000;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');    
    if (usuario==null){
      this.router.navigate(['/']);
    }
    this.getAll();
  }

  formatearTelefono(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.replace(/[^\d+]/g, '');
    const soloNumeros = valor.replace(/\D/g, '');

    if (soloNumeros.startsWith('56')) {
      this.alumno.telefono = `+${soloNumeros.substring(2)}`.replace(/^\+/, '+56');
    } else if (soloNumeros.length >= 9) {
      this.alumno.telefono = `+56${soloNumeros}`;
    } else {
      this.alumno.telefono = valor;
    }

    input.value = this.alumno.telefono;
  }

  formatearRut(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9kK-]/g, '').toUpperCase();

    valor = valor.replace(/-/g, '');

    if (valor.length > 8) {
      const digitoVerificador = valor.slice(-1);
      const cuerpo = valor.slice(0, 8);
      valor = `${cuerpo}-${digitoVerificador}`;
    } else if (valor.length > 0) {
      valor = valor.replace(/(.{1,8})/, '$1');
    }

    this.alumno.rut = valor;
    input.value = valor;
  }

  onErrorHandle(error: any): void{
    console.log("Error");
    
  }

  getAll(){
    this.alumnoService.getAllAlumnos().subscribe(
      response => {
        console.log(response);
        this.alumnos = response;
      },
      error =>{
        console.log(error);
      }
    );
  }

  editarAlumno (alumno: Alumno){
    this.alumnoForm.setValue(alumno);
  }

  agregar({value, valid}: NgForm){
    if(!valid){
     
    }
    else{
      //Agregar el nuevo cliente
      value.digito='2';      
      this.alumnoService.agregarCliente(value).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();    
       
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.alumnoForm.resetForm();
      this.cerrarModal();      
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  borrar(alumno: Alumno){
    if (alumno.rut!=undefined){
        this.alumnoService.eliminar(alumno).subscribe(
          (data: any)=>{
          console.log(data);  
          this.getAll();
         
        }, 
        (error)=>{this.onErrorHandle(error);
        });
      }
    }  

  /*pop up */
  showDialog(alumno: Alumno) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
       that.borrar(alumno);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }
/* fin pop up */
  
}