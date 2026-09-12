package cl.castrosoft.gym.entity;

import lombok.Data;

import javax.persistence.*;


/*
 * 
CREATE TABLE `folio_venta` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `folio` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8
*/

@Data
@Entity
@Table(name="folio_venta")
public class FolioVentaEntity {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3473232395956253893L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column (name = "folio")
	private Long folio;

}
