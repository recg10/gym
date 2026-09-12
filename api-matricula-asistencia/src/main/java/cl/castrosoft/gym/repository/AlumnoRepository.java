package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.AlumnoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<AlumnoEntity, String> {
    Optional<AlumnoEntity> findByRut(String rut);
}
