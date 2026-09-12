package cl.castrosoft.gym.controller;


import cl.castrosoft.gym.dto.MailDTO;
import cl.castrosoft.gym.dto.PasoArticuloDTO;
import cl.castrosoft.gym.dto.ArticuloDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.service.ArticuloService;
import cl.castrosoft.gym.service.PasoArticuloService;
import cl.castrosoft.gym.util.UtilResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/articulo")
@Slf4j
public class ArticuloController {

    @Autowired
    private ArticuloService service;

    @Autowired
    private PasoArticuloService pasoService;

    @PostMapping("/getByCodigo")
    public Response getArticuloByCodigo(@RequestBody ArticuloDTO dto)
            throws RecordNotFoundException
    {
        ArticuloDTO response = service.getArticuloByCodigo(dto.getCodigo());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/getByCodigoBarras")
    public Response getArticuloByCodigoBarras(@RequestBody ArticuloDTO dto)
            throws RecordNotFoundException
    {
        ArticuloDTO response = service.getArticuloByCodigoBarras(dto.getCodBarras());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/getById")
    public Response getArtiuloById(@RequestBody ArticuloDTO dto)
            throws RecordNotFoundException
    {
        ArticuloDTO response = service.getArticuloById(dto.getId());
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/guardar")
    public ResponseEntity<ArticuloDTO> guardarProducto(@RequestBody ArticuloDTO dto)
            throws RecordNotFoundException, ArticuloException {
        ArticuloDTO response= service.guardarProducto(dto);
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<ArticuloDTO>> getAll()
            throws RecordNotFoundException
    {
        List<ArticuloDTO> response = service.getAll();
        return new ResponseEntity(response, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public Response delete(@PathVariable Long id)
            throws ArticuloException
    {
        service.delete(id);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "OK");
    }

    @PostMapping("/enviar")
    public Response enviar(@RequestBody PasoArticuloDTO dto)
            throws RecordNotFoundException
    {
        PasoArticuloDTO response = pasoService.guardar(dto);
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    @PostMapping("/notificar-stock-critico")
    public Response notificaStockCritico(@RequestBody MailDTO dto)
            throws RecordNotFoundException, ArticuloException {
        Boolean response = service.notificarStockCritico();
        return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, response);
    }

    /*@PostMapping("/leer-producto")
    public Response leerProducto(@RequestBody PasoArticuloDTO dto)
            throws RecordNotFoundException
    {
        PasoArticuloDTO response = pasoService.getProductoByCodigo(dto.getCodigo());
        ArticuloDTO resp=null;
        if (response!=null){
            resp = service.getArticuloByCodigo(dto.getCodigo());
            return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, resp);
        }else{
            return UtilResponse.crearResponse(HttpStatus.NOT_FOUND.toString(), null, "NO OK");
        }

    }*/

    /*@PostMapping("/leer-producto-usuario")
    public Response leerProductoByUsuario(@RequestBody PasoArticuloDTO dto)
            throws RecordNotFoundException
    {
        PasoArticuloDTO response = pasoService.getProductoByUsuario(dto.getUsuarioRut());
        ArticuloDTO resp=null;
        if (response!=null){
            resp = service.getProductoByCodigo(response.getCodigo());
            try {
                pasoService.delete(response.getCodigo());
                return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, resp);
            } catch (ArticuloException e) {
                return UtilResponse.crearResponse(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage(), "NO OK");
            }
        }else{
            return UtilResponse.crearResponse(HttpStatus.OK.toString(), null, "NO OK");
        }

    }*/


}
