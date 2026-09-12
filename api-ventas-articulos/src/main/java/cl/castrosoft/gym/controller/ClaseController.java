package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.ClaseDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.ClaseException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.ClaseService;
import cl.castrosoft.gym.service.PasoArticuloService;
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
@RequestMapping("/clase")
@Slf4j
public class ClaseController {

    @Autowired
    private ClaseService service;

    @Autowired
    private PasoArticuloService pasoService;

    @PostMapping("/getById")
    public ResponseEntity<List<ClaseDTO>> getProducto(@RequestBody ClaseDTO dto)
            throws RecordNotFoundException
    {
        ClaseDTO response = service.getProductoByCodigo(dto.getId());
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<ClaseDTO> guardarProducto(@RequestBody ClaseDTO dto)
            throws RecordNotFoundException
    {
        ClaseDTO response = service.guardarProducto(dto);
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<ClaseDTO>> getAll()
            throws RecordNotFoundException
    {
        List<ClaseDTO> response = service.getAll();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public Response delete(@PathVariable Integer id)
            throws ArticuloException, ClaseException {
        service.delete(id);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }

}
