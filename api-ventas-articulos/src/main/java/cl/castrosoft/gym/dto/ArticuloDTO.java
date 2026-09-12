package cl.castrosoft.gym.dto;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;



@Data
public class ArticuloDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6017703086084376931L;
	/**
	 * 
	 */
	private Long id;

	private String codigo;

	private String nombre;

	private Integer claseId;

	private String claseDescripcion;

	private String marca;

	private Double precio_venta;

	private java.time.LocalDateTime fechaRegistro;

	private Integer stock;

	private Integer stock_min;

	private String codBarras;


}
