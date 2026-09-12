import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../servicios/usuario.service';
import { AuthService } from './../../servicios/auth.service';
import { Usuario } from './../../modelo/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, 
              private authService: AuthService,
              private router: Router
             ) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  usuario!: Usuario;
  email!: string;
  password!: string; 
  msgError="";

  login() {
    this.usuarioService.getUsuarioByMailByPass(this.email, this.password)
    .subscribe(
      response => {
        console.log(response);
        this.usuario = response;
        this.authService.login(this.usuario);
        this.router.navigateByUrl('/usuarios');
      },
      error =>{
        console.log(error);        
        this.msgError="Error en credenciales";
      }
    );
  }

}