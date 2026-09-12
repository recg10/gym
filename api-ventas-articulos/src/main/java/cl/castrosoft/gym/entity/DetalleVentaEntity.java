package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `precio_producto` int(11) DEFAULT NULL,
  `cantidad_producto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_venta_venta_fk` (`id_venta`),
  KEY `detalle_venta_producto_fk` (`id_producto`),
  CONSTRAINT `detalle_venta_venta_fk` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci
*/
@Data
@Entity
@Table(name="detalle_venta")
public class DetalleVentaEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473032395956263893L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column (name = "id_venta")
	private Integer idVenta;
	@Column (name = "id_articulo")
	private Integer idArticulo;
	@Column (name = "precio")
	private Integer precio;
	@Column (name = "cantidad")
	private Integer cantidad;
	
}
