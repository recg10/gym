package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;

import java.security.Timestamp;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "asistencia")
public class AsistenciaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime fecha;
    //private Timestamp fecha;
    

    @Column(name = "rut_alumno", nullable = false)
    private String rutAlumno;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;
}
