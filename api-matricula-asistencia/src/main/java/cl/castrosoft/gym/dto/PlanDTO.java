package cl.castrosoft.gym.dto;

import lombok.Data;
import java.time.LocalDateTime;


@Data
public class PlanDTO {

    private Integer id; 
    private String nombre;
    private Integer dias; 
    private String precio;
    private LocalDateTime createdAt;
}