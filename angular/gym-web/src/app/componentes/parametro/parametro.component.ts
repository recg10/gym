import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../modelo/usuario.model';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Parametro } from 'src/app/modelo/parametro.model';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  constructor(private parametroService: ParametroService,
    private router: Router,
    private confirmationDialogService: ConfirmDialogService) { }

    usuarios!: Parametro[];
    usuario: Parametro = {
    id: 0,
    nombre: '',
    texto: '',
    numerico: 0
  }

  @ViewChild("proveedorForm")
  proveedorForm!: NgForm;
  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  readonly timemOut=2000;

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario===null){
      this.router.navigate(['/']);
    }
    this.getAll();
  }

  onErrorHandle(error: any): void{
    console.log("Error");
    
  }

  getAll(){
    this.parametroService.getAll().subscribe(
      response => {
        console.log(response);
        this.usuarios = response;
      },
      error =>{
        console.log(error);
      }
    );
  }

  limpiar (){
    this.proveedorForm.resetForm();    
  }

  editarProveedor (usuario: Parametro){
    this.proveedorForm.resetForm();
    this.proveedorForm.setValue(usuario);
  }

  agregar({value, valid}: NgForm){
    if(!valid){
     
    }
    else{
      this.parametroService.agregar(value).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();       
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.proveedorForm.resetForm();
      this.cerrarModal();      
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  borrar(usuario: Parametro){
    if (usuario.id!=undefined){
        this.parametroService.eliminar(usuario).subscribe(
          (data: any)=>{
          console.log(data);  
          this.getAll();
         
        }, 
        (error)=>{this.onErrorHandle(error);
        });
      }
    }  

  /*pop up */
  showDialog(usuario: Parametro) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
       that.borrar(usuario);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }
/* fin pop up */
  
}