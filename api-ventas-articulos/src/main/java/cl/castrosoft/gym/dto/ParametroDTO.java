package cl.castrosoft.gym.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class ParametroDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6014353086084376931L;

	private Integer id;
	private String nombre;
	private String texto;
	private Integer numerico;
}
