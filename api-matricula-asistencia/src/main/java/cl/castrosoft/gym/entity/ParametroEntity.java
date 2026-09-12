package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `parametro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NULL,
  `texto` varchar(100) NULL,
  `numerico` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
*/

@Data
@Entity
@Table(name="parametro")
public class ParametroEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3473032394356253893L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column (name = "nombre")
	private String nombre;
	@Column (name = "texto")
	private String texto;
	@Column (name = "numerico")
	private Integer numerico;
	
}
