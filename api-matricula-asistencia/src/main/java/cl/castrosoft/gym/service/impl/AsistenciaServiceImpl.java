package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.dto.AsistenciaDTO;
import cl.castrosoft.gym.dto.RegistrarAsistenciaDTO;
import cl.castrosoft.gym.entity.AlumnoEntity;
import cl.castrosoft.gym.entity.AsistenciaEntity;
import cl.castrosoft.gym.entity.MatriculaRenovacionEntity;
import cl.castrosoft.gym.exception.AsistenciaException;
import cl.castrosoft.gym.exception.InformeAsistenciaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.AlumnoRepository;
import cl.castrosoft.gym.repository.AsistenciaRepository;
import cl.castrosoft.gym.repository.MatriculaRenovacionRepository;
import cl.castrosoft.gym.service.AsistenciaService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AsistenciaServiceImpl implements AsistenciaService {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private MatriculaRenovacionRepository matriculaRenovacionRepository;

    @Transactional
    public AsistenciaDTO registrarAsistencia(RegistrarAsistenciaDTO dto) 
    throws RecordNotFoundException, AsistenciaException {
        if (dto == null || dto.getRutAlumno() == null) {
            throw new IllegalArgumentException("Rut de alumno requerido");
        }
        Optional<AlumnoEntity> alumnoOpt = alumnoRepository.findByRut(dto.getRutAlumno());
        if (!alumnoOpt.isPresent()) {
            //throw new RecordNotFoundException("Alumno no encontrado", dto.getRutAlumno());
            throw new AsistenciaException("Alumno no encontrado", new Exception());
        }
        List<MatriculaRenovacionEntity> matriculaOpt = matriculaRenovacionRepository.findByAlumnoRutAndActiva(dto.getRutAlumno(), Boolean.TRUE);
        if (matriculaOpt.isEmpty()) {
            //throw new RecordNotFoundException("Matricula no encontrado o no vigente", dto.getRutAlumno());
            throw new AsistenciaException("Matricula no encontrado o no vigente", new Exception());
        }
        MatriculaRenovacionEntity matricula = matriculaOpt.get(0);        
        Integer asistenciasUtilizadas = matricula.getDiasUtilizados();
        Integer asistenciasContratadas = matricula.getDiasContratados();
        if (asistenciasUtilizadas == null) {
            throw new AsistenciaException("No hay asistencias disponibles", new Exception());
        }
        if (asistenciasUtilizadas > asistenciasContratadas) {
            throw new AsistenciaException("Dias de asistencia excedidos", new Exception());
        }        
        
        AsistenciaEntity entity = new AsistenciaEntity();
        entity.setRutAlumno(dto.getRutAlumno());
        entity.setUsuario(dto.getUsuario());
        entity.setMatriculaId(matricula.getId());
        //entity.setFecha(LocalDateTime.now());
        entity.setFecha(dto.getFecha() != null ? dto.getFecha() : LocalDateTime.now());
        log.info("Registrando asistencia para alumno: {}, rut: {}", alumnoOpt.get().getNombre(), dto.getRutAlumno());
        log.info("Asistencias utilizadas: {}, asistencias contratadas: {}", asistenciasUtilizadas, asistenciasContratadas);        
        log.info("Matricula activa: {}", matricula.getActiva());
        log.info("Fecha de asistencia: {}", entity.getFecha());        
        Integer inserted =  asistenciaRepository.insertAsistencia(entity.getFecha(), entity.getRutAlumno(), entity.getUsuario(), entity.getMatriculaId());
        matricula.setDiasUtilizados(asistenciasUtilizadas + 1);
        if (matricula.getDiasUtilizados().intValue() == matricula.getDiasContratados().intValue()) {
            matricula.setActiva(Boolean.FALSE);           
        }
        matriculaRenovacionRepository.save(matricula);
        //asistenciaRepository.executeUpdate("INSERT INTO asistencia (fecha, rut_alumno, usuario, matricula_id) VALUES (:fecha, :rutAlumno, :usuario, :matriculaId)");
        //entity = asistenciaRepository.save(entity);        
        AsistenciaDTO result = new AsistenciaDTO();
        BeanUtils.copyProperties(entity, result);        
        return result;
    }
    @Transactional(readOnly = true)
    public List<AsistenciaDTO> consultarAsistencias(String fecha, Integer rut) throws RecordNotFoundException, AsistenciaException {
        
        List<AlumnoDTO> alumnoDtos = alumnoRepository.findAll().stream()
                .map(entity -> {
                    AlumnoDTO dto = new AlumnoDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());

        List<AsistenciaEntity> entities = asistenciaRepository.findByDateLong(Long.parseLong(fecha.replace("-", "")));
        return entities.stream().map(entity -> {
            AsistenciaDTO dto = new AsistenciaDTO();
            BeanUtils.copyProperties(entity, dto);
            AlumnoDTO alumnoDTO = alumnoDtos.stream()
                        .filter(u -> u.getRut().equals(entity.getRutAlumno()))
                        .findFirst()
                        .orElse(null);
                if (alumnoDTO != null) {
                    dto.setAlumnoNombre(alumnoDTO.getNombre());
                    dto.setAlumnoPaterno(alumnoDTO.getPaterno());
                    dto.setAlumnoMaterno(alumnoDTO.getMaterno());
                }
                //List<MatriculaRenovacionEntity> matriculaOpt = matriculaRenovacionRepository.findByAlumnoRutAndActiva(entity.getRutAlumno(), Boolean.TRUE);
                Optional<MatriculaRenovacionEntity> matriculaOpt = matriculaRenovacionRepository.findById(entity.getMatriculaId());
                /* if (matriculaOpt.isEmpty()) {
                    throw new AsistenciaException("Matricula no encontrado o no vigente", new Exception());
                } */ 
               Integer asistenciasUtilizadas = 0;
               Integer asistenciasContratadas = 0;
               if (!matriculaOpt.isEmpty()) {
                   MatriculaRenovacionEntity m = matriculaOpt.get();
                   asistenciasUtilizadas = m.getDiasUtilizados();
                   asistenciasContratadas = m.getDiasContratados();
               }
               dto.setAsistenciasContratadas(asistenciasContratadas);
               dto.setAsistenciasUtilizadas(asistenciasUtilizadas);
               if (asistenciasContratadas != null && asistenciasUtilizadas != null) {
                   int diff = asistenciasContratadas.intValue() - asistenciasUtilizadas.intValue();
                   if (diff >= 3 ) {
                       dto.setColor("green");
                   } else if (diff == 2) {
                       dto.setColor("yellow");
                   } else if (diff <= 1) {
                       dto.setColor("red");
                   }
               } else {
                   dto.setColor(null);
               }
            return dto;
        }).collect(Collectors.toList());
    }

    public AsistenciaDTO actualizarAsistencia(Long id, AsistenciaDTO dto) throws RecordNotFoundException {
        Optional<AsistenciaEntity> entityOpt = asistenciaRepository.findById(id);
        if (!entityOpt.isPresent()) {
            throw new RecordNotFoundException("Asistencia no encontrada", id.toString());
        }
        AsistenciaEntity entity = entityOpt.get();
        BeanUtils.copyProperties(dto, entity);
        entity.setId(id); // Asegurar que no cambie el id
        entity = asistenciaRepository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
    
    @Transactional
    public void eliminarAsistencia(Long id) throws RecordNotFoundException {
        if (!asistenciaRepository.existsById(id)) {
            throw new RecordNotFoundException("Asistencia no encontrada", id.toString());
        }
        asistenciaRepository.deleteById(id);
    }

    @Transactional
    public List<AsistenciaDTO> informeAsistencia(AsistenciaDTO dto) throws RecordNotFoundException, InformeAsistenciaException{
        List<AsistenciaEntity> student= new ArrayList<>();
        String msg="";
        int contador=0;
        if (null==dto.getFechaDesde() || null==dto.getFechaHasta()){            
            msg += "Debe ingresar fecha desde y fecha hasta. ";
            contador++; 
        }
        if (null==dto.getRutAlumno() || dto.getRutAlumno().isEmpty()){            
            msg += "Debe ingresar un RUT de alumno. ";
            contador++;
        }
        if (contador>1){
            throw new InformeAsistenciaException(msg, new Exception());
        }
        List<AlumnoDTO> alumnoDtos = alumnoRepository.findAll().stream()
                .map(entity -> {
                    AlumnoDTO alumnoDTO = new AlumnoDTO();
                    BeanUtils.copyProperties(entity, alumnoDTO);
                    return alumnoDTO;
                })
                .collect(Collectors.toList());

        student = asistenciaRepository.findByRangoFechaAndRut(dto.getFechaDesde(), dto.getFechaHasta(), dto.getRutAlumno());
        List<AsistenciaDTO> listResult = new ArrayList<AsistenciaDTO>();
        for (AsistenciaEntity entity: student){
            AsistenciaDTO dto2 = new AsistenciaDTO();
            BeanUtils.copyProperties(entity, dto2);
            AlumnoDTO alumnoDTO = alumnoDtos.stream()
                        .filter(u -> u.getRut().equals(entity.getRutAlumno()))
                        .findFirst()
                        .orElse(null);
                if (alumnoDTO != null) {
                    dto2.setAlumnoNombre(alumnoDTO.getNombre());
                    dto2.setAlumnoPaterno(alumnoDTO.getPaterno());
                    dto2.setAlumnoMaterno(alumnoDTO.getMaterno());
                }
            listResult.add(dto2);
        }
        return listResult;
    }
}
