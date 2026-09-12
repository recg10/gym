package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `clase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1
*/

@Data
@Entity
@Table(name="clase")
public class ClaseEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3783032395956253893L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column (name = "descripcion")
	private String descripcion;
}
