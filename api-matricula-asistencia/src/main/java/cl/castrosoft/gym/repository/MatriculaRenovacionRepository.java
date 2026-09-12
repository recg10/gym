package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.AsistenciaEntity;
import cl.castrosoft.gym.entity.MatriculaRenovacionEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatriculaRenovacionRepository extends JpaRepository<MatriculaRenovacionEntity, Long> {

    @Query("SELECT m FROM MatriculaRenovacionEntity m JOIN AlumnoEntity a ON m.alumnoRut = a.rut WHERE " +
           /* "(:fechaInicio IS NULL OR m.fechaRegistro >= :fechaInicio) AND " +
           "(:fechaFin IS NULL OR m.fechaRegistro <= :fechaFin) AND " + */
           "(:tipoPlan IS NULL OR m.idTipoPlan = :tipoPlan) AND " +
           "(:alumnoRut IS NULL OR m.alumnoRut = :alumnoRut) AND " +
           "(:nombre IS NULL OR LOWER(a.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
           "(:apellido IS NULL OR LOWER(a.paterno) LIKE LOWER(CONCAT('%', :apellido, '%')))")
    List<MatriculaRenovacionEntity> findByFiltros(/* @Param("fechaInicio") LocalDate fechaInicio,
                                        @Param("fechaFin") LocalDate fechaFin, */
                                        @Param("tipoPlan") Integer tipoPlan,
                                        @Param("alumnoRut") String alumnoRut,
                                        @Param("nombre") String nombre,
                                        @Param("apellido") String apellido);

    List<MatriculaRenovacionEntity> findByAlumnoRutAndActiva(String rut, Boolean activa);

    List<MatriculaRenovacionEntity> findByTipo(String tipo, Sort sort);

    @Query(value ="SELECT * FROM matricula_renovacion a WHERE (:fechaDesde IS NULL OR DATE(a.fecha_registro) BETWEEN :fechaDesde AND :fechaHasta) AND (:tipo IS NULL OR a.tipo = :tipo)", nativeQuery = true)
    List<MatriculaRenovacionEntity> findByRangoFechaAndTipo(@Param("fechaDesde") LocalDateTime fechaDesde, @Param("fechaHasta") LocalDateTime fechaHasta, @Param("tipo") String tipo);
}