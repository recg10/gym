package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.DetalleVentaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface DetalleVentaRepository extends JpaRepository<DetalleVentaEntity, Integer> {

    Optional<DetalleVentaEntity> findById (Integer id);

    List<DetalleVentaEntity> findByIdVenta (Integer id);
}
