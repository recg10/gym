package cl.castrosoft.gym.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class ClaseDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6017703087784376931L;
	/**
	 * 
	 */
	private Integer id;

	private String descripcion;

}
