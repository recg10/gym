package cl.castrosoft.gym.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.AlumnoService;
import cl.castrosoft.gym.util.UtilResponse;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/alumno")
@Slf4j
public class AlumnoController {

    @Autowired
    private AlumnoService service;

    @PostMapping("/getByRut")
    public ResponseEntity<List<AlumnoDTO>> getByRut(@RequestBody AlumnoDTO dto)
            throws RecordNotFoundException
    {
        AlumnoDTO response = service.getByRut(dto.getRut());
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

   /*  @PostMapping("/usuario-email-pass")
    public ResponseEntity<List<AlumnoDTO>> getUsuarioByEmailAndPass(@RequestBody AlumnoDTO dto)
            throws RecordNotFoundException
    {
        AlumnoDTO response = service.getUsuarioByEmailAndPass(dto.getEmail(), dto.getClave());
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    } */

    @PostMapping("/all")
    public ResponseEntity<List<AlumnoDTO>> getAllProveedor()
            throws RecordNotFoundException
    {
        List<AlumnoDTO> response = service.getAll();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<AlumnoDTO> guardar(@RequestBody AlumnoDTO dto)
            throws RecordNotFoundException
    {
        AlumnoDTO response = service.guardar(dto);
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/del")
    public Response delete(@RequestBody AlumnoDTO dto)
            throws RecordNotFoundException
    {
        service.delete(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }
}
