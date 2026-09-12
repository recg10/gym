package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.PasoArticuloEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasoArticuloRepository extends JpaRepository<PasoArticuloEntity, Long> {

    Optional<PasoArticuloEntity> findByCodigo (Long codigo);

    Optional<PasoArticuloEntity> findByUsuarioRut (Integer rut);

}
