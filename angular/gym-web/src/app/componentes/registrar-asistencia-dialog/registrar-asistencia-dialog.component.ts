import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { rutValidator } from 'src/app/util/validador.rut';

@Component({
  selector: 'app-registrar-asistencia-dialog',
  templateUrl: './registrar-asistencia-dialog.component.html',
  styleUrls: ['./registrar-asistencia-dialog.component.css']
})
export class RegistrarAsistenciaDialogComponent {

  readonly form: FormGroup;
  readonly data: any;
  desactivarBoton: boolean = false;

  constructor(
    public readonly dialogRef: MatDialogRef<RegistrarAsistenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private readonly service: AsistenciaService,
    private readonly fb: FormBuilder
  ) {
    this.data = data;
    this.form = this.fb.group({
      rut: [this.data.rut || '', [Validators.required, rutValidator()]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onErrorHandle(): void{
    console.log("Error");
  }

  formatearRut(event: any): void {
    let rut = event.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (rut.length > 8) {
      rut = rut.slice(0, -1) + '-' + rut.slice(-1);
    }
    
    this.form.get('rut')?.setValue(rut, { emitEvent: false });
  }

  onAccept(): void {
    if (this.form.invalid) {
      return;
    }
    this.desactivarBoton=true;
    const rutValue = this.form.get('rut')?.value || '';
    this.service.registrarAsistencia(rutValue, localStorage.getItem('rutUsuario') || '', this.data.selectedDate)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.onErrorHandle();
          this.dialogRef.close(error);
        }
      });
  }

  

}
