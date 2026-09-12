package cl.castrosoft.gym.controller;

import cl.castrosoft.gym.dto.MatriculaRenovacionDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.MatriculaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.MatriculaService;
import cl.castrosoft.gym.util.UtilResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/matricula")
@CrossOrigin("*")
@Tag(name = "Matrícula", description = "API para gestión de matrículas de alumnos")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @PostMapping("/guardar")
    public Response guardarPlan(@RequestBody MatriculaRenovacionDTO dto) throws RecordNotFoundException, MatriculaException {
        MatriculaRenovacionDTO response = matriculaService.crearMatricula(dto);
        return UtilResponse.crearResponse(HttpStatus.CREATED.toString(), null, response);
    }
    
    @PostMapping("/all")
    public ResponseEntity<List<MatriculaRenovacionDTO>> getAllProveedor()
            throws RecordNotFoundException
    {
        List<MatriculaRenovacionDTO> response = matriculaService.listarMatriculas();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
         //return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }


    @GetMapping("/{id}")
    public Response obtenerMatricula(@PathVariable Long id) throws RecordNotFoundException {
        MatriculaRenovacionDTO response = matriculaService.obtenerMatricula(id);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PutMapping("/{id}")
    public Response actualizarMatricula(@PathVariable Long id, @RequestBody MatriculaRenovacionDTO dto) throws RecordNotFoundException {
        MatriculaRenovacionDTO response = matriculaService.actualizarMatricula(id, dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/del")
    public Response delete(@RequestBody MatriculaRenovacionDTO dto)
            throws RecordNotFoundException {
        matriculaService.eliminarMatricula(dto.getId());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "Matrícula eliminada");
    }

    @GetMapping("/consulta")
    @Operation(summary = "Consultar matrículas", description = "Consulta matrículas con filtros opcionales por fechas, tipo de plan, RUT, nombre y apellido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta realizada exitosamente")
    })
    public Response consultarMatriculas(@RequestParam(required = false) String fechaInicio,
                                        @RequestParam(required = false) String fechaFin,
                                        @RequestParam(required = false) Integer tipoPlan,
                                        @RequestParam(required = false) String alumnoRut,
                                        @RequestParam(required = false) String nombre,
                                        @RequestParam(required = false) String apellido) {
        LocalDate fechaInicioParsed = null;
        LocalDate fechaFinParsed = null;
        if (fechaInicio != null && !fechaInicio.isEmpty()) {
            fechaInicioParsed = LocalDate.parse(fechaInicio);
        }
        if (fechaFin != null && !fechaFin.isEmpty()) {
            fechaFinParsed = LocalDate.parse(fechaFin);
        }
        List<MatriculaRenovacionDTO> response = matriculaService.consultarMatriculas(fechaInicioParsed, fechaFinParsed, tipoPlan, alumnoRut, nombre, apellido);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/informeMatriculasRenovaciones")
    public ResponseEntity<List<MatriculaRenovacionDTO>> getInformeMatriculas(@RequestBody MatriculaRenovacionDTO dto)
            throws RecordNotFoundException, MatriculaException
    {
        List<MatriculaRenovacionDTO> response = matriculaService.informeMatriculasRenovaciones(dto);
         return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);        
    }
}