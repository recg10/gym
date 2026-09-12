package cl.castrosoft.gym.dto;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class VentaDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6045703086084376931L;
	/**
	 * 
	 */
	private Integer id;
	private Integer rutCliente;
	private Integer total;
	private LocalDateTime fecha;
	private Integer rutUsuario;
	private Integer boleta;
	private Integer credito;
	private LocalDateTime creditoFecha;
	private String pagoComentario;
	private String pagoTipo;
	private LocalDateTime creditoFechaPago;

	private List<DetalleVentaDTO> detalles;

	private LocalDateTime fechaDesde;
	private LocalDateTime fechaHasta;

}
