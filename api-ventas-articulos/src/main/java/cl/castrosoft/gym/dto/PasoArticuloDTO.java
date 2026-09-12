package cl.castrosoft.gym.dto;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;


@Data
public class PasoArticuloDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6217703086084376931L;
	/**
	 * 
	 */
	private Long codigo;
	private Integer usuarioRut;


}
