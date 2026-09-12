package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "plan")
public class PlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "dias", nullable = false)
    private Integer dias;

    @Column(name = "precio", nullable = false)
    private String precio;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;    
}