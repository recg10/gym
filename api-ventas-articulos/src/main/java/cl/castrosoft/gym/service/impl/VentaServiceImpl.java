package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.DetalleVentaDTO;
import cl.castrosoft.gym.entity.DetalleVentaEntity;
import cl.castrosoft.gym.exception.DetalleVentaException;
import cl.castrosoft.gym.exception.VentaException;
import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.entity.VentaEntity;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.DetalleVentaRepository;
import cl.castrosoft.gym.repository.VentaRepository;
import cl.castrosoft.gym.service.DetalleVentaService;
import cl.castrosoft.gym.service.VentaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@Service
@Slf4j
public class VentaServiceImpl implements VentaService {

	@Autowired
    VentaRepository repository;

    @Autowired
    DetalleVentaRepository detalleVentaRepository;
    @Autowired
    DetalleVentaService detalleService;
    public VentaDTO getById(Integer id) throws RecordNotFoundException
    {
        Optional<VentaEntity> student = repository.findById(id);
        if(student.isPresent()) {
            VentaDTO preventivaDTO = new VentaDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	log.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            log.error("RecordNotFoundException");
            throw new RecordNotFoundException("No venta record exist for given Codigo {}",id.longValue());
        }
    }

    public List<VentaDTO> getByRutCredito(Integer rut, Integer credito) throws RecordNotFoundException
    {
        List<VentaEntity> list = repository.findByRutClienteAndCreditoAndCreditoFechaPagoIsNull(rut, credito);
        List<VentaDTO> listResult = new ArrayList<VentaDTO>();
        for (VentaEntity entity: list){
            VentaDTO dto = new VentaDTO();
            BeanUtils.copyProperties(entity, dto);
            List<DetalleVentaDTO> detalles =  detalleService.getByIdVenta(entity.getId());
            dto.setDetalles(detalles);
            listResult.add(dto);
        }
        return listResult;
    }

    public List<VentaDTO> getAll() throws RecordNotFoundException  {

        List<VentaEntity> student = repository.findAll();
        List<VentaDTO> listResult = new ArrayList<VentaDTO>();
        for (VentaEntity entity: student){
            VentaDTO dto = new VentaDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public VentaDTO save(VentaDTO dto) throws VentaException{
        VentaEntity entity = new VentaEntity();
        dto.setFecha(LocalDateTime.now());
        BeanUtils.copyProperties(dto, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        log.info("venta almacenado con exito {}", dto);
        return dto;
    }

    @Transactional
    public Boolean generarVenta (VentaDTO venta, List<DetalleVentaDTO> detalle) throws DetalleVentaException {

        List<DetalleVentaDTO> responseDetalle = detalleService.save(detalle);
        log.info("respuesta detalle: {}",responseDetalle);
        try {
            venta.setFecha(LocalDateTime.now());
            VentaDTO responseVenta = this.save(venta);
            log.info("Respuest venta {}",responseVenta);
            return true;
        }catch (VentaException e){
            log.error("revierto detalle de denta ",e);
            detalleService.delete(detalle.get(0));
            return false;
        }
    }

    @Transactional
    public Boolean cancelarVenta (VentaDTO venta, List<DetalleVentaDTO> detalle) throws DetalleVentaException {

    try {
        for (DetalleVentaDTO dto : detalle) {
            log.info("Eliminando detalle venta {}", dto);
            detalleService.delete(dto);
        }
        log.info("Eliminando venta venta {}", venta);
        delete(venta.getId());
        return true;
        }catch (VentaException e){
            log.error("revierto detalle de denta ",e);
            return false;
        }
    }

    public void delete (Integer id) throws VentaException {
        try{
            repository.deleteById(id);
            log.info("venta eliminado con exito");
        } catch (Exception e){
            log.error(e.getMessage());
            throw new VentaException("Error al eliminar venta", e);
        }

    }

    public List<VentaDTO> informeVenta(VentaDTO venta) throws RecordNotFoundException, VentaException{
        List<VentaEntity> student= new ArrayList<>();
        log.info("Parametros de busqueda: {}", venta);
        if (venta.getCredito()!=null){
            student = repository.findByFechaBetweenAndCredito(venta.getFechaDesde(), venta.getFechaHasta(), venta.getCredito());
        }else if (venta.getPagoTipo()!=null){  
            student = repository.findByFechaBetweenAndPagoTipo(venta.getFechaDesde(), venta.getFechaHasta(), venta.getPagoTipo());
        }else{
            student = repository.findByFechaBetween(venta.getFechaDesde(), venta.getFechaHasta());
        }

        List<VentaDTO> listResult = new ArrayList<VentaDTO>();
        for (VentaEntity entity: student){
            VentaDTO dto = new VentaDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public List<VentaDTO> getAllDate(@RequestParam(required = false) String fecha) throws VentaException,RecordNotFoundException  {

        List<VentaEntity> entities = repository.findByDateLong(Long.parseLong(fecha.replace("-", "")));
        return entities.stream().map(entity -> {            
            VentaDTO dto = new VentaDTO();
            BeanUtils.copyProperties(entity, dto);
            return dto;
        }).collect(Collectors.toList());
    }

}
