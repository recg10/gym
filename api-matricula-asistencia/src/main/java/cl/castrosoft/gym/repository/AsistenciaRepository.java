package cl.castrosoft.gym.repository;

import cl.castrosoft.gym.entity.AsistenciaEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface AsistenciaRepository extends JpaRepository<AsistenciaEntity, Long> {

    @Query("SELECT a FROM AsistenciaEntity a WHERE (:fecha IS NULL OR DATE(a.fecha) = :fecha) AND (:rut IS NULL OR a.rutAlumno = :rut)")
    List<AsistenciaEntity> findByFechaAndRut(@Param("fecha") String fecha, @Param("rut") Integer rut);

    //List<AsistenciaEntity> findByFechaBetweenAndActivo (LocalDateTime fechaDesde, LocalDateTime fechaHasta, Integer activo);
    List<AsistenciaEntity> findByFechaBetweenOrderByFechaAsc (LocalDateTime fechaDesde, LocalDateTime fechaHasta);
    
    List<AsistenciaEntity> findByFechaBetweenAndRutAlumnoOrderByFechaAsc (LocalDateTime fechaDesde, LocalDateTime fechaHasta, String rutAlumno);

    @Query(value ="SELECT * FROM asistencia a WHERE (:fechaDesde IS NULL OR DATE(a.fecha) BETWEEN :fechaDesde AND :fechaHasta) AND (:rut IS NULL OR a.rut_alumno = :rut)", nativeQuery = true)
    List<AsistenciaEntity> findByRangoFechaAndRut(@Param("fechaDesde") LocalDateTime fechaDesde, @Param("fechaHasta") LocalDateTime fechaHasta, @Param("rut") String rut);



    @Query(value = "select * from asistencia c where DATE_FORMAT(c.fecha, '%Y%m%d') = :date ORDER BY c.fecha DESC", nativeQuery = true)
    List<AsistenciaEntity> findByDateLong (Long date);

    @Modifying
    @Query(value = "INSERT INTO asistencia (fecha, rut_alumno, usuario, matricula_id) VALUES (:fecha, :rutAlumno, :usuario, :matriculaId)", nativeQuery = true)
    Integer insertAsistencia(@Param("fecha") LocalDateTime fecha, @Param("rutAlumno") String rutAlumno, @Param("usuario") String usuario, @Param("matriculaId") Long matriculaId);

}
