import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../modelo/usuario.model';
import { NgForm, Validators } from '@angular/forms';
import { ConfirmDialogService } from './../../servicios/confirm-dialog.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { rutValidator } from 'src/app/util/validador.rut';


@Component({
  selector: 'app-usuarioss',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private confirmationDialogService: ConfirmDialogService) { }

    usuarios!: Usuario[];
    usuario: Usuario = {
    rut: '',
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    email: '',
    perfil: ''
  }

  @ViewChild("usuarioForm")
  usuarioForm!: NgForm;
  @ViewChild("botonCerrar")
  botonCerrar!: ElementRef;

  readonly timemOut=2000;

  perfilSelected='';
  

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

  getAll(){
    this.usuarioService.getAllClientes().subscribe(
      response => {
        console.log(response);
        this.usuarios = response;        
      },
      error =>{
        console.log(error);
      }
    );
  }

  editarUsuario (usuario: Usuario){
    this.usuarioForm.setValue(usuario);
    this.perfilSelected = usuario.perfil?? '' ;
  }

  resetForm(){
    this.usuarioForm.resetForm();
  }


  agregar({value, valid}: NgForm){
    this.usuarioForm.resetForm();
    if(!valid){
     
    }
    else{
      //Agregar el nuevo cliente      
      this.usuarioService.agregarCliente(value).subscribe((data: any)=>{        
        console.log(data);  
        this.getAll();      
      }, 
      (error)=>{this.onErrorHandle(error);
      });
      this.usuarioForm.resetForm();
      this.cerrarModal();      
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  borrar(usuario: Usuario){
    if (usuario.rut!=undefined){
        this.usuarioService.eliminar(usuario).subscribe(
          (data: any)=>{
          console.log(data);  
          this.getAll();
         
        }, 
        (error)=>{this.onErrorHandle(error);
        });
      }
    }

    /* onRutChange(event: any) {
      const input = event.target as HTMLInputElement;
      const rut = input.value;
      const valid = rutValidator(rut);
      if (valid) {
        input.setCustomValidity('RUT inválido');
      } else {
        input.setCustomValidity('');
      }
    } */

  /*pop up */
  showDialog(usuario: Usuario) {  
    let that = this;
    this.confirmationDialogService.confirmThis("Estas seguro?", function () {  
       that.borrar(usuario);
    }, function () {  
      console.log("Cierre pop up opcion NO");
    })  
  }
/* fin pop up */
  
}