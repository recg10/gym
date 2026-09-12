package cl.castrosoft.gym.controller;

import cl.castrosoft.gym.dto.AsistenciaDTO;
import cl.castrosoft.gym.dto.RegistrarAsistenciaDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.AsistenciaException;
import cl.castrosoft.gym.exception.InformeAsistenciaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.AsistenciaService;
import cl.castrosoft.gym.util.UtilResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/asistencia")
@Slf4j
@Tag(name = "Asistencia", description = "API para gestión de asistencias al gimnasio")
public class AsistenciaController {

    @Autowired
    private AsistenciaService asistenciaService;

    @PostMapping("/registrar-asistencia")
    @Operation(summary = "Registrar nueva asistencia", description = "Registra la asistencia de un alumno al gimnasio, deduciendo una asistencia disponible")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Asistencia registrada exitosamente"),
        @ApiResponse(responseCode = "404", description = "Alumno no encontrado")
    })
    public Response registrarAsistencia(@RequestBody RegistrarAsistenciaDTO dto)
            throws RecordNotFoundException, AsistenciaException {
        AsistenciaDTO response = asistenciaService.registrarAsistencia(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @GetMapping("/consulta")
    @Operation(summary = "Consultar asistencias", description = "Consulta asistencias filtradas por fecha y/o RUT del alumno")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta realizada exitosamente")
    })
    public Response consultarAsistencias(@RequestParam(required = false) String fecha,
                                         @RequestParam(required = false) Integer rut)
            throws RecordNotFoundException, AsistenciaException {
       /*  
       LocalDate fechaParsed = null;
        if (fecha != null && !fecha.isEmpty()) {
            fechaParsed = LocalDate.parse(fecha);
        } 
            */
        List<AsistenciaDTO> response = asistenciaService.consultarAsistencias(fecha, rut);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PutMapping("/{id}")
    public Response actualizarAsistencia(@PathVariable Long id, @RequestBody AsistenciaDTO dto)
            throws RecordNotFoundException {
        AsistenciaDTO response = asistenciaService.actualizarAsistencia(id, dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @DeleteMapping("/{id}")
    public Response eliminarAsistencia(@PathVariable Long id)
            throws RecordNotFoundException {
        asistenciaService.eliminarAsistencia(id);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "Asistencia eliminada");
    }

    @PostMapping("/informe-asistencia")
    public Response informeAsistencia(@RequestBody AsistenciaDTO dto)
            throws AsistenciaException, RecordNotFoundException, InformeAsistenciaException {
        List<AsistenciaDTO> response = asistenciaService.informeAsistencia(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }
}