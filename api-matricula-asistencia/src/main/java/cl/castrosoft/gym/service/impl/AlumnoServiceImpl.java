package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.service.AlumnoService;
import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.entity.AlumnoEntity;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.AlumnoRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class AlumnoServiceImpl implements AlumnoService {

	private static final Logger logger = LogManager.getLogger(AlumnoServiceImpl.class);

	@Autowired
    AlumnoRepository repository;

    public AlumnoDTO getByRut(String rut) throws RecordNotFoundException
    {   
        Optional<AlumnoEntity> student = repository.findByRut(rut);
        if(student.isPresent()) {
            AlumnoDTO preventivaDTO = new AlumnoDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	logger.info("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",rut);
        }
    }

   /*  public AlumnoDTO getAlumnoByEmailAndPass(String mail, String pass) throws RecordNotFoundException
    {
        Optional<AlumnoEntity> entity = repository.findByEmailAndClave(mail, pass);
        if(entity.isPresent()) {
            AlumnoDTO preventivaDTO = new AlumnoDTO();
            BeanUtils.copyProperties(entity.get(), preventivaDTO);
            logger.info("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No alumno record exist for given Codigo {}",null);
        }
    } */

    public List<AlumnoDTO> getAll() throws RecordNotFoundException  {

        List<AlumnoEntity> student = repository.findAll();
        List<AlumnoDTO> listResult = new ArrayList<AlumnoDTO>();
        for (AlumnoEntity entity: student){
            AlumnoDTO dto = new AlumnoDTO();
            BeanUtils.copyProperties(entity, dto);
            listResult.add(dto);
        }
        return listResult;
    }

    public AlumnoDTO guardar(AlumnoDTO dto) throws RecordNotFoundException{
        AlumnoEntity entity = new AlumnoEntity();        
        BeanUtils.copyProperties(dto, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        logger.info("Alumno almacenado con exito {}", dto);
        return dto;
    }

    public void delete(AlumnoDTO dto) throws RecordNotFoundException{
        AlumnoEntity entity = new AlumnoEntity();
        BeanUtils.copyProperties(dto, entity);
        repository.delete(entity);
        logger.info("Alumno eliminado con exito {}", dto);
    }


}
