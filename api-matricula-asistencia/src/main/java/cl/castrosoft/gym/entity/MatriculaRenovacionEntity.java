package cl.castrosoft.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "matricula_renovacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaRenovacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tipo_plan")
    private Integer idTipoPlan;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "usuario_rut")
    private String usuarioRut;

    @Column(name = "alumno_rut")
    private String alumnoRut;

    @Column(name = "dias_contratados")
    private Integer diasContratados;

    @Column(name = "dias_utilizados")
    private Integer diasUtilizados;

    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;

    @Column(name = "activa")
    private Boolean activa;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "valor")
    private Integer valor;
}