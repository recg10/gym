package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {

    Optional<UsuarioEntity> findByRut (String rut);

    Optional<UsuarioEntity> findByEmailAndClave (String email, String clave);
}
