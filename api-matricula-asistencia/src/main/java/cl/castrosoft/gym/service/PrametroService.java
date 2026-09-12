package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.ParametroDTO;
import cl.castrosoft.gym.exception.ParametroException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import java.util.List;


public interface PrametroService {

    ParametroDTO getParametroByNombre(String codigo) throws RecordNotFoundException;
    ParametroDTO getParametroById(Integer codigo) throws RecordNotFoundException;
    List<ParametroDTO> getAll() throws RecordNotFoundException;
    ParametroDTO guardar(ParametroDTO ArticuloDTO) throws RecordNotFoundException;
    void delete (Long id) throws ParametroException;

}
