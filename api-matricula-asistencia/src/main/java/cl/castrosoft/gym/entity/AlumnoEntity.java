package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "alumno")
public class AlumnoEntity {

    @Id
    @Column(name = "rut")
    private String rut;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "paterno")
    private String paterno;

    @Column(name = "materno")
    private String materno;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "fecha_nacimiento")
    private String fechaNacimiento;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "email")
    private String email;
}
