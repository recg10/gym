package cl.castrosoft.gym.service;


import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;


public interface DetalleVentaService {

    DetalleVentaDTO getById(Integer rut) throws RecordNotFoundException;

    List<DetalleVentaDTO> getByIdVenta(Integer idVenta) throws RecordNotFoundException;
    List<DetalleVentaDTO> save(List<DetalleVentaDTO> dtos) throws DetalleVentaException;
    DetalleVentaDTO save(DetalleVentaDTO dto) throws RecordNotFoundException, DetalleVentaException;
    List<DetalleVentaDTO> getAll() throws RecordNotFoundException;

    void delete (DetalleVentaDTO id) throws DetalleVentaException;

}
