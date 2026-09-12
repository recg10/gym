package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.UsuarioDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.UsuarioService;
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
@RequestMapping("/usuario")
@Slf4j
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/getByRut")
    public ResponseEntity<List<UsuarioDTO>> getByRut(@RequestBody UsuarioDTO dto)
            throws RecordNotFoundException
    {
        UsuarioDTO response = service.getByRut(dto.getRut());
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/usuario-email-pass")
    public ResponseEntity<List<UsuarioDTO>> getUsuarioByEmailAndPass(@RequestBody UsuarioDTO dto)
            throws RecordNotFoundException
    {
        UsuarioDTO response = service.getUsuarioByEmailAndPass(dto.getEmail(), dto.getClave());
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<UsuarioDTO>> getAllProveedor()
            throws RecordNotFoundException
    {
        List<UsuarioDTO> response = service.getAll();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<UsuarioDTO> guardar(@RequestBody UsuarioDTO dto)
            throws RecordNotFoundException
    {
        UsuarioDTO response = service.guardar(dto);
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/del")
    public Response delete(@RequestBody UsuarioDTO dto)
            throws RecordNotFoundException
    {
        service.delete(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }
}
