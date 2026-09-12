import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../modelo/usuario.model';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from '../../servicios/confirm-dialog.service';
import { Alumno } from 'src/app/modelo/alumno.model';
import { PlanService } from 'src/app/servicios/plan.service';
import { Plan } from 'src/app/modelo/plan.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private planService: PlanService,    
    private confirmationDialogService: ConfirmDialogService,
    private router: Router) { }

    planes!: Plan[];
    plan: Plan = {
    id: 0,
    nombre: '',
    precio: 0,
    dias: 0   
  }

  @ViewChild("planForm")
  planForm!: NgForm;
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

  onErrorHandle(error: any): void{
    console.log("Error");
    
  }

  reset (){
    this.planForm.resetForm();
  }

  getAll(){
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

  editarPlan (plan: Plan){
    this.planForm.setValue(plan);
  }

  agregar({value, valid}: NgForm){
    if(!valid){
     
    }
    else{
      //Agregar el nuevo cliente
      value.digito='2';      
      this.planService.agregarCliente(value).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();    
       
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.planForm.resetForm();
      this.cerrarModal();      
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  borrar(plan: Plan){
    if (plan.id!=undefined){
        this.planService.eliminar(plan).subscribe(
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