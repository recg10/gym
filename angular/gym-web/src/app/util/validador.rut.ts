import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rut = control.value;
    if (!rut) return null; // Si está vacío, no validar (usar Validators.required)

    // Limpiar el RUT
    const valor = rut.replace(/[^0-9kK]/g, '');
    if (valor.length < 2) return { invalidRut: true };

    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1).toUpperCase();

    // Validar formato mínimo
    if (cuerpo.length < 7) return { invalidRut: true };

    // Validar que sea numérico el cuerpo
    if (!/^\d+$/.test(cuerpo)) return { invalidRut: true };

    // Validar que DV sea número o K
    if (!/^[\dK]$/.test(dv)) return { invalidRut: true };

    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvCalculado ? null : { invalidRut: true };
  };
}