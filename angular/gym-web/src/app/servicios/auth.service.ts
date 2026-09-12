import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioFromStorage());
  public usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();

  constructor() { }

  private getUsuarioFromStorage(): Usuario | null {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  login(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.clear();
    this.usuarioSubject.next(null);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
