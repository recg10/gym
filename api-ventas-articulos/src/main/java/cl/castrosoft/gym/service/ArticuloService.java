package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.ArticuloDTO;
import cl.castrosoft.gym.dto.MailDTO;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import java.util.List;


public interface ArticuloService {

    ArticuloDTO getArticuloByCodigo(String codigo) throws RecordNotFoundException;

    ArticuloDTO getArticuloByCodigoBarras(String codigo) throws RecordNotFoundException;

    ArticuloDTO getArticuloById(Long codigo) throws RecordNotFoundException;

    Boolean notificarStockCritico() throws ArticuloException;

    List<ArticuloDTO> getAll() throws RecordNotFoundException;
    ArticuloDTO guardarProducto(ArticuloDTO ArticuloDTO) throws RecordNotFoundException, ArticuloException;

    void delete (Long id) throws ArticuloException;

}
