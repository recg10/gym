package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;


/*
 * 
CREATE TABLE `venta` (
  `id` int NOT NULL,
  `rut_cliente` int DEFAULT NULL,
  `total` bigint DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `rut_usuario` int DEFAULT NULL,
  `boleta` int DEFAULT NULL,
  `credito` smallint DEFAULT NULL COMMENT '0=Sin credito 1= con credito',
  `credito_fecha` datetime DEFAULT NULL,
  `credito_comentario` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_cliente_fk` (`rut_cliente`),
  CONSTRAINT `venta_cliente_fk` FOREIGN KEY (`rut_cliente`) REFERENCES `cliente` (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
*/

@Data
@Entity
@Table(name="venta")
public class VentaEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473032395956253893L;

	@Id
	@Column (name = "id")
	private Integer id;
	@Column (name = "rut_cliente")
	private Integer rutCliente;
	@Column (name = "total")
	private Integer total;
	@Column (name = "fecha")
	private LocalDateTime fecha;
	@Column (name = "rut_usuario")
	private Integer rutUsuario;
	@Column (name = "boleta")
	private Integer boleta;
	@Column (name = "credito")
	private Integer credito;
	@Column (name = "credito_fecha")
	private LocalDateTime creditoFecha;
	@Column (name = "pago_comentario")
	private String pagoComentario;
	@Column (name = "pago_tipo")
	private String pagoTipo;
	@Column (name = "credito_fecha_pago")
	private LocalDateTime creditoFechaPago;

}
