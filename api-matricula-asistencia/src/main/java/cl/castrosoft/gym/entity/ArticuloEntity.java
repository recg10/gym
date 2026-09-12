package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `asistencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `rut_alumno` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `usuario` int NOT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
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
	@Column (name = "codigo")
	private String codigo;
	@Column (name = "nombre")
	private String nombre;
	@Column (name = "codigoAlternativo")
	private String codigoAlternativo;
	@Column (name = "marca")
	private String marca;
	@Column (name = "precio_venta")
	private Integer precio_venta;
	@Column (name = "stock")
	private Integer stock;
	@Column (name = "stock_min")
	private Integer stock_min;
	@Column (name = "clase_id")
	private Integer claseId;
	@Column (name = "cod_barras")
	private String codBarras;
	
}
