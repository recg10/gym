package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.UsuarioDTO;
import cl.castrosoft.gym.entity.UsuarioEntity;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.UsuarioRepository;
import cl.castrosoft.gym.service.UsuarioService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	private static final Logger logger = LogManager.getLogger(UsuarioServiceImpl.class);

	@Autowired
    UsuarioRepository repository;

    public UsuarioDTO getByRut(String rut) throws RecordNotFoundException
    {
        Optional<UsuarioEntity> student = repository.findByRut(rut);
        if(student.isPresent()) {
            UsuarioDTO preventivaDTO = new UsuarioDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	logger.info("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",rut);
        }
    }

    public UsuarioDTO getUsuarioByEmailAndPass(String mail, String pass) throws RecordNotFoundException
    {
        Optional<UsuarioEntity> entity = repository.findByEmailAndClave(mail, pass);
        if(entity.isPresent()) {
            UsuarioDTO preventivaDTO = new UsuarioDTO();
            BeanUtils.copyProperties(entity.get(), preventivaDTO);
            logger.info("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No usuario record exist for given Codigo {}",null);
        }
    }

    public List<UsuarioDTO> getAll() throws RecordNotFoundException  {

        List<UsuarioEntity> student = repository.findAll();
        List<UsuarioDTO> listResult = new ArrayList<UsuarioDTO>();
        for (UsuarioEntity entity: student){
            UsuarioDTO dto = new UsuarioDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public UsuarioDTO guardar(UsuarioDTO dto) throws RecordNotFoundException{
        UsuarioEntity entity = new UsuarioEntity();
        BeanUtils.copyProperties(dto, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        logger.info("Usuario almacenado con exito {}", dto);
        return dto;
    }

    public void delete(UsuarioDTO dto) throws RecordNotFoundException{
        UsuarioEntity entity = new UsuarioEntity();
        BeanUtils.copyProperties(dto, entity);
        repository.delete(entity);
        logger.info("Usuario eliminado con exito {}", dto);
    }


}
