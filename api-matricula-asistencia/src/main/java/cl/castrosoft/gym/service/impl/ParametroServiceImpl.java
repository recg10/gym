package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.ParametroDTO;
import cl.castrosoft.gym.entity.ParametroEntity;
import cl.castrosoft.gym.exception.ParametroException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.ParametroRepository;
import cl.castrosoft.gym.service.PrametroService;
import lombok.extern.slf4j.Slf4j;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j 
public class ParametroServiceImpl implements PrametroService {

	@Autowired
    ParametroRepository repository;

    public ParametroDTO getParametroByNombre(String nombre) throws RecordNotFoundException
    {
        Optional<ParametroEntity> student = repository.findByNombre(nombre);
        if(student.isPresent()) {
            ParametroDTO preventivaDTO = new ParametroDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	log.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	log.error("RecordNotFoundException");
            throw new RecordNotFoundException("No parametro record exist for given Codigo {}",nombre);
        }
    }

    public ParametroDTO getParametroById(Integer id) throws RecordNotFoundException
    {
        Optional<ParametroEntity> student = repository.findById(id);
        if(student.isPresent()) {
            ParametroDTO preventivaDTO = new ParametroDTO();
            BeanUtils.copyProperties(student.get(), preventivaDTO);
            log.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            log.error("RecordNotFoundException");
            throw new RecordNotFoundException("No parametro record exist for given Codigo {}",""+id););
        }
    }

    @Transactional
    public List<ParametroDTO> getAll() throws RecordNotFoundException
    {
        List<ParametroEntity> student = repository.findAll();
        List<ParametroDTO> listResult = new ArrayList<ParametroDTO>();
        for (ParametroEntity entity: student){
            ParametroDTO dto = new ParametroDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public ParametroDTO guardar(ParametroDTO dto) throws RecordNotFoundException{
        ParametroEntity entity = new ParametroEntity();
        BeanUtils.copyProperties(dto, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        log.info("Parametro almacenado con exito {}", dto);
        return dto;
    }

    public void delete (Long id) throws ParametroException {
        try{
            repository.deleteById(id);
            log.info("Parametro eliminado con exito");
        } catch (Exception e){
            log.error(e.getMessage());
            throw new ParametroException("Error al eliminar Parametro", e);
        }
    }
}
