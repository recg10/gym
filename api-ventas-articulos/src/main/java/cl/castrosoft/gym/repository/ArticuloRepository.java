package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.ArticuloEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticuloRepository extends JpaRepository<ArticuloEntity, Long> {

    Optional<ArticuloEntity> findByCodigo (String codigo);

    Optional<ArticuloEntity> findByCodBarras (String codigoBarras);

    Optional<ArticuloEntity> findById (Long codigo);

    @Query(value = "select codigo, nombre, precio_venta, stock from articulo where stock<=stock_min", nativeQuery = true)
    List<Object> notificacionStockCritico ();
}
