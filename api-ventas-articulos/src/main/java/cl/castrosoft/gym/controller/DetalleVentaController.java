package cl.castrosoft.gym.controller;

import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.DetalleVentaService;
import cl.castrosoft.gym.util.UtilResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/detalle-venta")
@Slf4j
public class DetalleVentaController {

    @Autowired
    private DetalleVentaService service;

    @PostMapping("/getBy")
    public Response getBy(@RequestBody DetalleVentaDTO dto)
            throws RecordNotFoundException
    {
        DetalleVentaDTO response = service.getById(dto.getId());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/getBy-idVenta")
    public Response getByIdVenta(@RequestBody DetalleVentaDTO dto)
            throws RecordNotFoundException
    {
        List<DetalleVentaDTO> response = service.getByIdVenta(dto.getIdVenta());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/getAll")
    public Response getAll()
            throws RecordNotFoundException
    {
        List<DetalleVentaDTO> response = service.getAll();
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/saveAll")
    public Response save(@RequestBody List<DetalleVentaDTO> dtos)
            throws DetalleVentaException    {

       List<DetalleVentaDTO> response = service.save(dtos);

        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/save")
    public Response save(@RequestBody DetalleVentaDTO dtos)
            throws RecordNotFoundException, DetalleVentaException {

        DetalleVentaDTO response = service.save(dtos);

        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    //@DeleteMapping("/del/{id}")
    @PostMapping("/del")
    public Response delete(@RequestBody DetalleVentaDTO dto)
            throws DetalleVentaException {
        service.delete(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }

}
