package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.ArticuloDTO;
import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.entity.DetalleVentaEntity;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.ArticuloRepository;
import cl.castrosoft.gym.repository.DetalleVentaRepository;
import cl.castrosoft.gym.service.ArticuloService;
import cl.castrosoft.gym.service.DetalleVentaService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
@Slf4j
public class DetalleVentaServiceImpl implements DetalleVentaService {


    private static final String uri = "http://170.239.85.209:8090/articulo/getById";
    private static final String uriUpdate = "http://170.239.85.209:8090/articulo/guardar";

    //private static final String uri = "http://localhost:8090/articulo/getById";
    //private static final String uriUpdate = "http://localhost:8090/articulo/guardar";


	@Autowired
    DetalleVentaRepository repository;
    @Autowired
    ArticuloService articuloService;

    public DetalleVentaDTO getById(Integer id) throws RecordNotFoundException
    {
        Optional<DetalleVentaEntity> student = repository.findById(id);
        if(student.isPresent()) {
            DetalleVentaDTO preventivaDTO = new DetalleVentaDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	log.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            log.error("RecordNotFoundException");
            throw new RecordNotFoundException("No venta record exist for given Codigo {}",id.longValue());
        }
    }

    public List<DetalleVentaDTO> getByIdVenta(Integer idVenta) throws RecordNotFoundException
    {
        List<DetalleVentaEntity> detalleVentas = repository.findByIdVenta(idVenta);
        List<DetalleVentaDTO> dtoRespuesta = new ArrayList<DetalleVentaDTO>();
        if(!detalleVentas.isEmpty()) {
            for (DetalleVentaEntity entity : detalleVentas) {
                DetalleVentaDTO dto = new DetalleVentaDTO();
                BeanUtils.copyProperties(entity, dto );
                dtoRespuesta.add(dto);
            }
            log.debug("Elemento:"+dtoRespuesta.toString());
            return dtoRespuesta;
        } else {
            //log.error("RecordNotFoundException");
            //throw new RecordNotFoundException("No venta record exist for given Codigo {}",idVenta.longValue());
            return dtoRespuesta;
        }
    }

    public List<DetalleVentaDTO> getAll() throws RecordNotFoundException  {
        List<DetalleVentaEntity> student = repository.findAll();
        List<DetalleVentaDTO> listResult = new ArrayList<DetalleVentaDTO>();
        for (DetalleVentaEntity entity: student){
            DetalleVentaDTO dto = new DetalleVentaDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    @Transactional
    public List<DetalleVentaDTO> save(List<DetalleVentaDTO> dtos) throws DetalleVentaException{
        List<DetalleVentaDTO> dtoRespuesta = new ArrayList<DetalleVentaDTO>();
        List<DetalleVentaEntity> entities = new ArrayList<DetalleVentaEntity>();
        for (DetalleVentaDTO dto : dtos) {
            DetalleVentaEntity entity = new DetalleVentaEntity();
            BeanUtils.copyProperties(dto, entity);
            entities.add(entity);

        }
        entities = repository.saveAll(entities);
        for (DetalleVentaEntity entity : entities) {
            DetalleVentaDTO dto = new DetalleVentaDTO();
            BeanUtils.copyProperties(entity, dto);
            log.info("detalle almacenado con exito {}", dto);
            dtoRespuesta.add(dto);
        }
        return dtoRespuesta;
    }

    @Transactional
    public DetalleVentaDTO save(DetalleVentaDTO dtos) throws RecordNotFoundException, DetalleVentaException {

        RestTemplate restTemplate = new RestTemplate();
        ArticuloDTO articulo = articuloService.getArticuloById(dtos.getIdArticulo().longValue());
        //articuloDTO.setId(dtos.getIdArticulo().longValue());
        /* ResponseEntity<Response> result = restTemplate.postForEntity(uri, articuloDTO, Response.class);
        ObjectMapper mapper = new ObjectMapper();
        ArticuloDTO articulo = mapper.convertValue(result.getBody().getPayload(),
                new TypeReference<ArticuloDTO>(){}); */
        

        Integer saldoActual = articulo.getStock();
        log.info("Resto elemento: saldo actual {} vendido {}", saldoActual , dtos.getCantidad());
        if ( dtos.getCantidad()>saldoActual ){
            throw new DetalleVentaException("Cantidad supera al saldo en stock", null);
        }
        log.info("Realizamos resta de stock en articulo");
        Integer nuevoSaldo = articulo.getStock()-dtos.getCantidad();
        articulo.setStock(nuevoSaldo);

        /* ResponseEntity<Response> resultUpdateStock = restTemplate.postForEntity(uriUpdate, articulo, Response.class);
        log.info("Respuesta update stock: {}",resultUpdateStock); */
        ArticuloDTO articuloUpdate = articuloService.guardarProducto(articulo);
        log.info("Articulo actualizado con exito: {}", articuloUpdate);

        DetalleVentaEntity entity = new DetalleVentaEntity();
        BeanUtils.copyProperties(dtos, entity);
        log.info("entity a guardar {}", entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dtos);
        log.info("detalle almacenado con exito {}", dtos);
        return dtos;
    }

    @Transactional
    public void delete (DetalleVentaDTO dto) throws DetalleVentaException {
        try{
            log.info("eliminar resitro BD: {}", dto);
            repository.deleteById(dto.getId());
            log.info("actualizo  WS stock articulo");
            //RestTemplate restTemplate = new RestTemplate();
            ArticuloDTO articuloDTO = new ArticuloDTO();
            articuloDTO.setId(dto.getIdArticulo().longValue());
            //ResponseEntity<Response> result = restTemplate.postForEntity(uri, articuloDTO, Response.class);
            //ObjectMapper mapper = new ObjectMapper();
            //ArticuloDTO articulo = mapper.convertValue(result.getBody().getPayload(),
            //        new TypeReference<ArticuloDTO>(){});
            ArticuloDTO articulo = articuloService.getArticuloById(dto.getIdArticulo().longValue());
            Integer saldoActual = articulo.getStock();
            log.info("Agrego elemento: saldo actual {} de vuelto {}", saldoActual , dto.getCantidad());
            Integer nuevoSaldo = articulo.getStock()+dto.getCantidad();
            articulo.setStock(nuevoSaldo);
            //ResponseEntity<Response> resultUpdateStock = restTemplate.postForEntity(uriUpdate, articulo, Response.class);
            //log.info("Respuesta update stock: {}",resultUpdateStock);
            ArticuloDTO articuloUpdate = articuloService.guardarProducto(articulo);
        } catch (Exception e){
            log.error(e.getMessage());
            throw new DetalleVentaException("Error al eliminar detalle venta", e);
        }

    }
}
