import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsistenciaService } from '../../servicios/asistencia.service';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from './../../modelo/usuario.model';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog, 
              private asistenciaService: AsistenciaService, 
              private router: Router,
              private authService: AuthService) { }

  logeado = false;
  usuarioLogueado: Usuario | null = null;
  menuAbierto = false;
  private destroy$ = new Subject<void>();
    
  ngOnInit(): void {
    this.authService.usuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe(usuario => {
        this.usuarioLogueado = usuario;
        this.logeado = usuario !== null;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cerrarSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

/*   registrarAsistencia() {
    const dialogRef = this.dialog.open(RegistrarAsistenciaDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const hora = new Date().toLocaleTimeString();
        this.asistenciaService.addAsistencia({ nombre: 'Alumno ' + result, rut: result, hora });
      }
    });
  } */


}
