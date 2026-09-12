package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.VentaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VentaRepository extends JpaRepository<VentaEntity, Integer> {

    Optional<VentaEntity> findById (Integer id);

    List<VentaEntity> findByRutClienteAndCreditoAndCreditoFechaPagoIsNull (Integer rut, Integer credito);

    List<VentaEntity> findByFechaBetweenAndCredito (LocalDateTime fechaDesde, LocalDateTime fechaHasta, Integer credito);
    
    List<VentaEntity> findByFechaBetweenAndPagoTipo (LocalDateTime fechaDesde, LocalDateTime fechaHasta, String pagoTipo);

    List<VentaEntity> findByFechaBetween (LocalDateTime fechaDesde, LocalDateTime fechaHasta);

    @Query(value = "select * from venta c where DATE_FORMAT(c.fecha, '%Y%m%d') = :date ORDER BY c.fecha DESC", nativeQuery = true)
    List<VentaEntity> findByDateLong (Long date);

}
