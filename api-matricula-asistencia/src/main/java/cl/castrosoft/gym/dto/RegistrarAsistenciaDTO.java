package cl.castrosoft.gym.dto;

import java.security.Timestamp;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RegistrarAsistenciaDTO {

    private String rutAlumno;
    private String usuario;
    private LocalDateTime fecha;
}
