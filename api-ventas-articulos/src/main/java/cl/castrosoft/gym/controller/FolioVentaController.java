package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.FolioVentaDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.exception.VentaException;
import cl.castrosoft.gym.service.FolioVentaService;
import cl.castrosoft.gym.service.VentaService;
import cl.castrosoft.gym.util.UtilResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/folio-venta")
@Slf4j
public class FolioVentaController {

    @Autowired
    private FolioVentaService service;

    @PostMapping("/maximo")
    public Response getMaximo(@RequestBody VentaDTO dto)
            throws RecordNotFoundException
    {
        Long response = service.getMaximo();

        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/save")
    public Response save(@RequestBody FolioVentaDTO dto)
            throws RecordNotFoundException    {
        FolioVentaDTO response = service.save(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @DeleteMapping("/del")
    public Response delete(@RequestBody FolioVentaDTO dto)
            throws VentaException
    {
        service.delete(dto.getFolio());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }
}
