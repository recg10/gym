package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.ClaseDTO;
import cl.castrosoft.gym.entity.ArticuloEntity;
import cl.castrosoft.gym.entity.ClaseEntity;
import cl.castrosoft.gym.exception.ClaseException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.ArticuloRepository;
import cl.castrosoft.gym.repository.ClaseRepository;
import cl.castrosoft.gym.service.ClaseService;
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
public class ClaseServiceImpl implements ClaseService {

	private static final Logger logger = LogManager.getLogger(ClaseServiceImpl.class);

	@Autowired
    ClaseRepository repository;

    public ClaseDTO getProductoByCodigo(Integer codigo) throws RecordNotFoundException
    {
        Optional<ClaseEntity> student = repository.findById(codigo);
        if(student.isPresent()) {
            ClaseDTO preventivaDTO = new ClaseDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",codigo.longValue());
        }
    }

    @Transactional
    public List<ClaseDTO> getAll() throws RecordNotFoundException
    {
        List<ClaseEntity> student = repository.findAll();
        List<ClaseDTO > listResult = new ArrayList<ClaseDTO>();
        for (ClaseEntity entity: student){
            ClaseDTO dto = new ClaseDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public ClaseDTO guardarProducto(ClaseDTO claseDTO) throws RecordNotFoundException{
        ClaseEntity entity = new ClaseEntity();
        BeanUtils.copyProperties(claseDTO, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, claseDTO);
        logger.info("Producto almacenado con exito {}", claseDTO);
        return claseDTO;
    }

    public void delete (Integer id) throws ClaseException {
        try{
            repository.deleteById(id);
            logger.info("Producto eliminado con exito");
        } catch (Exception e){
            logger.error(e.getMessage());
            throw new ClaseException("Error al eliminar Producto", e);
        }

    }
}
