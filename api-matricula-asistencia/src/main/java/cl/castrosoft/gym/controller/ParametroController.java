package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.ParametroDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.ParametroException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.PrametroService;
import cl.castrosoft.gym.util.UtilResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/parametro")
@Slf4j
public class ParametroController {

    @Autowired
    private PrametroService service;


    @PostMapping("/getByNombre")
    public Response getNombreByCodigo(@RequestBody ParametroDTO dto)
            throws RecordNotFoundException
    {
        ParametroDTO response = service.getParametroByNombre(dto.getNombre());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/getById")
    public Response getParametroById(@RequestBody ParametroDTO dto)
            throws RecordNotFoundException
    {
        ParametroDTO response = service.getParametroById(dto.getId());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/guardar")
    public ResponseEntity<ParametroDTO> guardarProducto(@RequestBody ParametroDTO dto)
            throws RecordNotFoundException
    {
        ParametroDTO response = service.guardar(dto);
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<ParametroDTO>> getAll()
            throws RecordNotFoundException
    {
        List<ParametroDTO> response = service.getAll();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public Response delete(@PathVariable Long id)
            throws ParametroException
    {
        service.delete(id);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }

}
