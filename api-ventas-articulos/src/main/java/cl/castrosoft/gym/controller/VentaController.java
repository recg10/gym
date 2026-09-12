package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.dto.RequestGenerarVenta;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.VentaException;

import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.service.DetalleVentaService;
import cl.castrosoft.gym.service.VentaService;
import cl.castrosoft.gym.util.UtilResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;


@RestController
@CrossOrigin("*")
@RequestMapping("/venta")
@Slf4j
public class VentaController {

    @Autowired
    private VentaService service;
    private DetalleVentaService detalleService;

    @PostMapping("/getBy")
    public Response getBy(@RequestBody VentaDTO dto)
            throws RecordNotFoundException
    {
        VentaDTO response = null;
        List<VentaDTO> responses = null;
        if (dto.getId()!=null){
            response = service.getById(dto.getId());
            return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
        }else if(dto.getRutCliente()!=null){
            responses = service.getByRutCredito(dto.getRutCliente(), 1);
            return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, responses);
        }
        return UtilResponse.crearResponse(HttpStatus.NOT_FOUND.toString(), "Sin información", null);

    }

    @PostMapping("/getAll")
    public Response getAll()
            throws RecordNotFoundException
    {
        List<VentaDTO> response = service.getAll();
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/save")
    public Response save(@RequestBody VentaDTO dto)
            throws VentaException    {
        VentaDTO response = service.save(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @DeleteMapping("/del")
    public Response delete(@RequestBody VentaDTO dto)
            throws VentaException
    {
        service.delete(dto.getId());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }

    @PostMapping("/generar-venta")
    public Response generarVenta(@RequestBody RequestGenerarVenta dto)
            throws VentaException, DetalleVentaException {
        Boolean response = service.generarVenta(dto.getVenta(), dto.getDetalle());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/cancelar-venta")
    public Response calcelarVenta(@RequestBody RequestGenerarVenta dto)
            throws VentaException, DetalleVentaException {
        Boolean response = service.cancelarVenta(dto.getVenta(), dto.getDetalle());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/informe-asistencia")
    public Response informeAsistencia(@RequestBody VentaDTO dto)
            throws VentaException, DetalleVentaException {
        List<VentaDTO>  response = service.informeVenta(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    /**
     * @param fecha
     * @param rut
     * @return
     * @throws RecordNotFoundException
     * @throws AsistenciaException
     */
    @GetMapping("/monitor-venta")
    public Response monitorVenta(@RequestParam(required = false) String fecha)
            throws RecordNotFoundException, VentaException {
        List<VentaDTO> response = service.getAllDate(fecha);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/informe-venta")
    public Response informeVenta(@RequestBody VentaDTO dto)
            throws VentaException, DetalleVentaException {
        List<VentaDTO>  response = service.informeVenta(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

}
