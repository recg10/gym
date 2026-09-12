package cl.castrosoft.gym.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class DetalleVentaDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6335703336084376931L;
	/**
	 * 
	 */
	private Integer id;
	private Integer idVenta;
	private Integer idArticulo;
	private Integer precio;
	private Integer cantidad;
	private boolean isEdit;
}
