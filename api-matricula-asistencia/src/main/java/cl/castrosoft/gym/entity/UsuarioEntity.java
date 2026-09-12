package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/*
 * 
CREATE TABLE `proveedor` (
  `rut` int(11) NOT NULL,
  `digito` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci
*/

@Data
@Entity
@Table(name="usuario")
public class UsuarioEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473032395956563443L;
	
	@Id
	@Column (name = "rut")
	private String rut;
	@Column (name = "nombre")
	private String nombre;
	@Column (name = "paterno")
	private String paterno;
	@Column (name = "materno")
	private String materno;
	@Column (name = "telefono")
	private String telefono;
	@Column (name = "clave")
	private String clave;
	@Column (name = "perfil")
	private String perfil;
	@Column (name = "email")
	private String email;
}
