package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.PlanDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;

public interface PlanService {

    PlanDTO guardar(PlanDTO dto) throws RecordNotFoundException;
    void delete(PlanDTO dto) throws RecordNotFoundException;
    List<PlanDTO> getAll() throws RecordNotFoundException;
}