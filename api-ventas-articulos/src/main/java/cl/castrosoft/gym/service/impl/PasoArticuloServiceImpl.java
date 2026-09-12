package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.PasoArticuloDTO;
import cl.castrosoft.gym.entity.PasoArticuloEntity;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.exception.SPFErrorCode;
import cl.castrosoft.gym.repository.PasoArticuloRepository;
import cl.castrosoft.gym.service.PasoArticuloService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PasoArticuloServiceImpl implements PasoArticuloService {

	private static final Logger logger = LogManager.getLogger(PasoArticuloServiceImpl.class);

	@Autowired
    PasoArticuloRepository repository;

    public PasoArticuloDTO getProductoByCodigo(Long codigo) throws RecordNotFoundException
    {
        Optional<PasoArticuloEntity> student = repository.findByCodigo(codigo);
        if(student.isPresent()) {
            PasoArticuloDTO preventivaDTO = new PasoArticuloDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",codigo.longValue());
        }
    }

    public PasoArticuloDTO getProductoByUsuario(Integer rut) throws RecordNotFoundException
    {
        Optional<PasoArticuloEntity> student = repository.findByUsuarioRut(rut);
        if(student.isPresent()) {
            PasoArticuloDTO preventivaDTO = new PasoArticuloDTO();
            BeanUtils.copyProperties(student.get(), preventivaDTO);
            logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Rut {}",rut.longValue());
        }
    }

    public List<PasoArticuloDTO> getAll() throws RecordNotFoundException
    {
        List<PasoArticuloEntity> student = repository.findAll();
        List<PasoArticuloDTO > listResult = new ArrayList<PasoArticuloDTO>();
        for (PasoArticuloEntity entity: student){
            PasoArticuloDTO dto = new PasoArticuloDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public PasoArticuloDTO guardar (PasoArticuloDTO ArticuloDTO) throws RecordNotFoundException{
        PasoArticuloEntity entity = new PasoArticuloEntity();
        BeanUtils.copyProperties(ArticuloDTO, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, ArticuloDTO);
        logger.info("Producto almacenado con exito {}", ArticuloDTO);
        return ArticuloDTO;
    }

    public void delete (Long id) throws ArticuloException {
        try{
            repository.deleteById(id);
            logger.info("Producto eliminado con exito");
        } catch (Exception e){
            logger.error(e.getMessage());
            //throw new ArticuloException("Error al eliminar Producto", e);
            throw new ArticuloException(SPFErrorCode.ERROR_ELIMINAR, HttpStatus.BAD_REQUEST);
        }

    }
}
