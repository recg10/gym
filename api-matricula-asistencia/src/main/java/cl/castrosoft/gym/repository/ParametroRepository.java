package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.ParametroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParametroRepository extends JpaRepository<ParametroEntity, Long> {

    Optional<ParametroEntity> findByNombre (String nombre);

    Optional<ParametroEntity> findById (Integer codigo);
}
