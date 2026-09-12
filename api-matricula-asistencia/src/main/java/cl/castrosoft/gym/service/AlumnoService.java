package cl.castrosoft.gym.service;


import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;


public interface AlumnoService {

    AlumnoDTO getByRut(String rut) throws RecordNotFoundException;
    ///AlumnoDTO getAlumnoByEmailAndPass(String mail, String pass) throws cl.castrosoft.gym.exception.RecordNotFoundException;
    AlumnoDTO guardar(AlumnoDTO dto) throws RecordNotFoundException;
    List<AlumnoDTO> getAll() throws RecordNotFoundException;
    void delete(AlumnoDTO dto) throws RecordNotFoundException;

}
