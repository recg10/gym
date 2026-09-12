package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.VentaException;
import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;


public interface VentaService {
    VentaDTO getById(Integer rut) throws RecordNotFoundException;

    List<VentaDTO> getByRutCredito(Integer rut, Integer credito) throws RecordNotFoundException;
    VentaDTO save(VentaDTO CuentaDTO) throws VentaException;

    Boolean generarVenta(VentaDTO venta, List<DetalleVentaDTO> detalleVentaDTO) throws VentaException, DetalleVentaException;

    Boolean cancelarVenta(VentaDTO venta, List<DetalleVentaDTO> detalleVentaDTO) throws VentaException, DetalleVentaException;
    List<VentaDTO> getAll() throws RecordNotFoundException;

    void delete (Integer id) throws VentaException;

    List<VentaDTO> informeVenta(VentaDTO venta) throws RecordNotFoundException, VentaException;

    public List<VentaDTO> getAllDate(@RequestParam(required = false) String fecha) throws VentaException, RecordNotFoundException;

}

