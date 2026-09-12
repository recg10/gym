package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.FolioVentaDTO;
import cl.castrosoft.gym.dto.VentaDTO;
import cl.castrosoft.gym.entity.FolioVentaEntity;
import cl.castrosoft.gym.entity.VentaEntity;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.exception.VentaException;
import cl.castrosoft.gym.repository.FolioVentaRepository;
import cl.castrosoft.gym.repository.VentaRepository;
import cl.castrosoft.gym.service.FolioVentaService;
import cl.castrosoft.gym.service.VentaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FolioVentaServiceImpl implements FolioVentaService {

	@Autowired
    FolioVentaRepository repository;

    @Transactional
    public Long getMaximo() throws RecordNotFoundException{
        List<FolioVentaEntity> folioVentaEntitys =  repository.findAll();
        FolioVentaEntity folio = folioVentaEntitys.get(0);
        Long maximo = folio.getFolio();
        folio.setFolio(maximo+1);
        repository.save(folio);
        return maximo;
    }

    public FolioVentaDTO save(FolioVentaDTO dto) throws RecordNotFoundException{
        FolioVentaEntity entity = new FolioVentaEntity();
        BeanUtils.copyProperties(dto, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        log.info("folio almacenado con exito {}", dto);
        return dto;
    }

    public void delete (Long id) throws VentaException {
        try{
            repository.deleteById(id);
            log.info("folio eliminado con exito");
        } catch (Exception e){
            log.error(e.getMessage());
            throw new VentaException("Error al eliminar folio", e);
        }

    }
}
