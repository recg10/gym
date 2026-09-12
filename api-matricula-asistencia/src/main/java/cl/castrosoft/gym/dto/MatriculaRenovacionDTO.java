package cl.castrosoft.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaRenovacionDTO {

    private Long id;
    private String tipoPlan;
    private Integer idTipoPlan;
    private LocalDate fechaInicio;
    private String usuarioRut;
    private String alumnoRut;
    private String alumnoNombre;
    private String alumnoPaterno;
    private String alumnoMaterno;
    private Integer diasContratados;
    private Integer diasUtilizados;
    private LocalDate fechaVencimiento;
    private Boolean activa;
    private String tipo;
    private Integer valor;


    private LocalDateTime fechaDesde;
	private LocalDateTime fechaHasta;




}