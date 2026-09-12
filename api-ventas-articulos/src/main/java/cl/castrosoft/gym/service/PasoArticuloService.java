package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.PasoArticuloDTO;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;


public interface PasoArticuloService {

    PasoArticuloDTO getProductoByCodigo(Long codigo) throws RecordNotFoundException;

    PasoArticuloDTO getProductoByUsuario(Integer rut) throws RecordNotFoundException;

    List<PasoArticuloDTO> getAll() throws RecordNotFoundException;
    PasoArticuloDTO guardar(PasoArticuloDTO ArticuloDTO) throws RecordNotFoundException;

    void delete (Long id) throws ArticuloException;

}
