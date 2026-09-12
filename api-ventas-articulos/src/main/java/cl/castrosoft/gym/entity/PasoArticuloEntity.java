package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/*
 * 
CREATE TABLE `paso_producto` (
  `codigo` varchar(20) COLLATE utf8mb3_spanish_ci NOT NULL,
  `usuario_rut` int NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci
*/

@Data
@Entity
@Table(name="paso_producto")
public class PasoArticuloEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473033395956253893L;
	
	@Id
	@Column (name = "codigo")
	private Long codigo;
	@Column (name = "usuario_rut")
	private Integer usuarioRut;
	
}
