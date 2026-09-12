package cl.castrosoft.gym.dto;

import lombok.Data;
import java.io.Serializable;



@Data
public class UsuarioDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6037703086084376931L;
	/**
	 * 
	 */
	private String rut;
	private String nombre;
	private String telefono;
	private String paterno;
	private String materno;
	private String clave;
	private String perfil;
	private String email;

}
