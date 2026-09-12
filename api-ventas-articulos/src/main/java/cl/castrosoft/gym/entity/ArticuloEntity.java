package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `articulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio_venta` double NOT NULL,
  `stock` int(11) NOT NULL,
  `stock_min` int(11) DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `clase_id` int(11) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `cod_barras` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
*/

@Data
@Entity
@Table(name="articulo")
public class ArticuloEntity  {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473032395956253893L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "codigo")
	private String codigo;
	@Column(name = "nombre")
	private String nombre;
	@Column(name = "marca")
	private String marca;
	@Column(name = "precio_venta")
	private Double precio_venta;
	@Column(name = "stock")
	private Integer stock;
	@Column(name = "stock_min")
	private Integer stock_min;
	@Column(name = "clase_id")
	private Integer claseId;
	@Column(name = "fecha_registro", insertable = false, updatable = false)
	private java.time.LocalDateTime fechaRegistro;
	@Column(name = "cod_barras")
	private String codBarras;
	
}
