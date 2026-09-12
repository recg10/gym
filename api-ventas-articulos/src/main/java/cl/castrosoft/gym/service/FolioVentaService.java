package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.FolioVentaDTO;
import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.exception.VentaException;

import java.util.List;


public interface FolioVentaService {

    Long getMaximo() throws RecordNotFoundException;
    FolioVentaDTO save(FolioVentaDTO dto) throws RecordNotFoundException;
    void delete (Long id) throws VentaException;

}
