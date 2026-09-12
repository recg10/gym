package cl.castrosoft.gym.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AsistenciaDTO {

    private Long id;
    private LocalDateTime fecha;
    private String rutAlumno;
    private String usuario;
    private Integer activo;
    private Long matriculaId;

    private String alumnoNombre;
    private String alumnoPaterno;
    private String alumnoMaterno;


    private LocalDateTime fechaDesde;
	private LocalDateTime fechaHasta;

    private Integer asistenciasUtilizadas;
    private Integer asistenciasContratadas;
    
    private String color;

}
