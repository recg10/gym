package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.MatriculaRenovacionDTO;
import cl.castrosoft.gym.exception.MatriculaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import java.time.LocalDate;
import java.util.List;

public interface MatriculaService {

    MatriculaRenovacionDTO crearMatricula(MatriculaRenovacionDTO dto) throws MatriculaException;
    List<MatriculaRenovacionDTO> listarMatriculas();
    MatriculaRenovacionDTO obtenerMatricula(Long id) throws RecordNotFoundException;
    MatriculaRenovacionDTO actualizarMatricula(Long id, MatriculaRenovacionDTO dto) throws RecordNotFoundException;
    void eliminarMatricula(Long id) throws RecordNotFoundException;
    List<MatriculaRenovacionDTO> consultarMatriculas(LocalDate fechaInicio, LocalDate fechaFin, Integer tipoPlan, String alumnoRut, String nombre, String apellido);

    List<MatriculaRenovacionDTO> informeMatriculasRenovaciones(MatriculaRenovacionDTO dto) throws RecordNotFoundException, MatriculaException;

    void notificarMatriculaRenovacion(MatriculaRenovacionDTO matriculaRenovacionDTO) throws MatriculaException;
}