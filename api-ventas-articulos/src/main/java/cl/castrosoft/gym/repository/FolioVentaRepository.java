package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.FolioVentaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolioVentaRepository extends JpaRepository<FolioVentaEntity, Long> {

}
