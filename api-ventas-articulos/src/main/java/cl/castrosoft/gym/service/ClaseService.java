package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.ClaseDTO;
import cl.castrosoft.gym.exception.ClaseException;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;


public interface ClaseService {

    ClaseDTO getProductoByCodigo(Integer codigo) throws RecordNotFoundException;

    List<ClaseDTO> getAll() throws RecordNotFoundException;

    ClaseDTO guardarProducto(ClaseDTO claseDTO) throws RecordNotFoundException;

    void delete (Integer id) throws ClaseException;

}
