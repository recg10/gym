package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.AsistenciaDTO;
import cl.castrosoft.gym.dto.RegistrarAsistenciaDTO;
import cl.castrosoft.gym.exception.AsistenciaException;
import cl.castrosoft.gym.exception.InformeAsistenciaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface AsistenciaService {

    AsistenciaDTO registrarAsistencia(RegistrarAsistenciaDTO dto) throws RecordNotFoundException, AsistenciaException;

    List<AsistenciaDTO> consultarAsistencias(String fecha, Integer rut) throws RecordNotFoundException, AsistenciaException;

    AsistenciaDTO actualizarAsistencia(Long id, AsistenciaDTO dto) throws RecordNotFoundException;

    void eliminarAsistencia(Long id) throws RecordNotFoundException;

    List<AsistenciaDTO> informeAsistencia(AsistenciaDTO dto) throws RecordNotFoundException, InformeAsistenciaException;
}
