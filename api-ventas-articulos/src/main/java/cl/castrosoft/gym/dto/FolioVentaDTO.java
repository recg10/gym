package cl.castrosoft.gym.dto;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;


@Data
public class FolioVentaDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6045703086084333931L;
	/**
	 * 
	 */
	private Integer id;
	private Long folio;
}
