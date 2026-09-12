package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.dto.PlanDTO;
import cl.castrosoft.gym.entity.AlumnoEntity;
import cl.castrosoft.gym.entity.PlanEntity;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.PlanRepository;
import cl.castrosoft.gym.service.PlanService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository repository;

    public PlanDTO guardar(PlanDTO dto) throws RecordNotFoundException {
        PlanEntity entity = new PlanEntity();
        BeanUtils.copyProperties(dto, entity);
        entity.setCreatedAt(LocalDateTime.now());
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    public List<PlanDTO> getAll() throws RecordNotFoundException {
        List<PlanEntity> entities = repository.findAll();
        List<PlanDTO> dtos = new ArrayList<>();
        for (PlanEntity entity : entities) {
            PlanDTO dto = new PlanDTO();
            BeanUtils.copyProperties(entity, dto);
            dtos.add(dto);
        }
        return dtos;
    }

    public void delete(PlanDTO dto) throws RecordNotFoundException{
        PlanEntity entity = new PlanEntity();
        BeanUtils.copyProperties(dto, entity);
        repository.delete(entity);
        log.info("Plan eliminado con exito {}", dto);
    }

}