package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.PlanDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.PlanService;
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
@RequestMapping("/plan")
@Slf4j
public class PlanController {

    @Autowired
    private PlanService planService;

    @PostMapping("/guardar")
    public Response guardarPlan(@RequestBody PlanDTO dto)
            throws RecordNotFoundException {
        PlanDTO response = planService.guardar(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/all")
    public ResponseEntity<List<PlanDTO>> getAllPlanes()
            throws RecordNotFoundException {
        List<PlanDTO> response = planService.getAll();
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/del")
    public Response delete(@RequestBody PlanDTO dto)
            throws RecordNotFoundException
    {
        planService.delete(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }
}