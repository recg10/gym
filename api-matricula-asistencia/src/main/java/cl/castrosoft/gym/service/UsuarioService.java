package cl.castrosoft.gym.service;

import cl.castrosoft.gym.dto.UsuarioDTO;
import cl.castrosoft.gym.exception.RecordNotFoundException;

import java.util.List;


public interface UsuarioService {

    UsuarioDTO getByRut(String rut) throws RecordNotFoundException;

    UsuarioDTO getUsuarioByEmailAndPass(String mail, String pass) throws RecordNotFoundException;
    UsuarioDTO guardar(UsuarioDTO dto) throws RecordNotFoundException;

    List<UsuarioDTO> getAll() throws RecordNotFoundException;

    void delete(UsuarioDTO dto) throws RecordNotFoundException;

}
