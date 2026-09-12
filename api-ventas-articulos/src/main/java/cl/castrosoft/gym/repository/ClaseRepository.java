package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.ClaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClaseRepository extends JpaRepository<ClaseEntity, Integer> {

    Optional<ClaseEntity> findById (Integer id);

}
