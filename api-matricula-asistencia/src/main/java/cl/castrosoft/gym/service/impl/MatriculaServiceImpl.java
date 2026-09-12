package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.AlumnoDTO;
import cl.castrosoft.gym.dto.MailDTO;
import cl.castrosoft.gym.dto.MatriculaRenovacionDTO;
import cl.castrosoft.gym.dto.ParametroDTO;
import cl.castrosoft.gym.dto.PlanDTO;
import cl.castrosoft.gym.dto.Response;
import cl.castrosoft.gym.entity.MatriculaRenovacionEntity;
import cl.castrosoft.gym.entity.ParametroEntity;
import cl.castrosoft.gym.exception.MatriculaException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.repository.AlumnoRepository;
import cl.castrosoft.gym.repository.MatriculaRenovacionRepository;
import cl.castrosoft.gym.repository.ParametroRepository;
import cl.castrosoft.gym.repository.PlanRepository;
import cl.castrosoft.gym.service.MatriculaService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

@Service
@Slf4j 
public class MatriculaServiceImpl implements MatriculaService {

    @Autowired
    private MatriculaRenovacionRepository matriculaRenovacionRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private ParametroRepository parametroRepository;

    @Override
    public MatriculaRenovacionDTO crearMatricula(MatriculaRenovacionDTO dto) throws MatriculaException {
        
        // List<MatriculaRenovacionEntity> existingMatriculas = matriculaRenovacionRepository.findByAlumnoRutAndActiva(dto.getAlumnoRut(), Boolean.TRUE);
        // if (!existingMatriculas.isEmpty()) {
        //     throw new MatriculaException("El alumno con RUT " + dto.getAlumnoRut() + " ya tiene una matrícula o renovacion activa.", new Exception());
        // }
        MatriculaRenovacionEntity entity = new MatriculaRenovacionEntity();
        BeanUtils.copyProperties(dto, entity);
        entity.setFechaRegistro(LocalDateTime.now());
        //entity.setActiva(Boolean.TRUE);
        entity = matriculaRenovacionRepository.save(entity);
        BeanUtils.copyProperties(entity, dto);
        log.info("Matrícula creada con éxito {}", dto);
        try {
            notificarMatriculaRenovacion(dto);
        } catch (Exception e) {
            log.error("Error al enviar notificación de matrícula: {}", e.getMessage());            
        }        
        return dto;
    }

    @Override
    @Transactional
    public List<MatriculaRenovacionDTO> listarMatriculas() {
        List<MatriculaRenovacionEntity> entities = matriculaRenovacionRepository.findAll(
            Sort.by("activa").descending()
            .and(Sort.by("id").descending()));
        List<MatriculaRenovacionDTO> listDtos = entities.stream()
                .map(entity -> {
                    MatriculaRenovacionDTO dto = new MatriculaRenovacionDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
        List<PlanDTO> planesDtos = planRepository.findAll().stream()
                .map(entity -> {
                    PlanDTO dto = new PlanDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());

         List<AlumnoDTO> alumnoDtos = alumnoRepository.findAll().stream()
                .map(entity -> {
                    AlumnoDTO dto = new AlumnoDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
            listDtos.forEach(matricula -> {
                AlumnoDTO alumnoDTO = alumnoDtos.stream()
                        .filter(u -> u.getRut().equals(matricula.getAlumnoRut()))
                        .findFirst()
                        .orElse(null);
                if (alumnoDTO != null) {
                    matricula.setAlumnoNombre(alumnoDTO.getNombre());
                    matricula.setAlumnoPaterno(alumnoDTO.getPaterno());
                    matricula.setAlumnoMaterno(alumnoDTO.getMaterno());
                }
                PlanDTO planDTO = planesDtos.stream()
                        .filter(p -> p.getId().intValue()==matricula.getIdTipoPlan().intValue())
                        .findFirst()
                        .orElse(null);
                if (planDTO != null) {
                    matricula.setTipoPlan(planDTO.getNombre());
                    matricula.setIdTipoPlan(planDTO.getId());
                }                 
            });            
            return listDtos;
        
    }

    @Override
    public MatriculaRenovacionDTO obtenerMatricula(Long id) throws RecordNotFoundException {
        Optional<MatriculaRenovacionEntity> optional = matriculaRenovacionRepository.findById(id);
        if (optional.isPresent()) {
            MatriculaRenovacionDTO dto = new MatriculaRenovacionDTO();
            BeanUtils.copyProperties(optional.get(), dto);
            return dto;
        } else {
            throw new RecordNotFoundException("Matrícula no encontrada con ID: " + id, ""+id);
        }
    }

    @Override
    public MatriculaRenovacionDTO actualizarMatricula(Long id, MatriculaRenovacionDTO dto) throws RecordNotFoundException {
        Optional<MatriculaRenovacionEntity> optional = matriculaRenovacionRepository.findById(id);
        if (optional.isPresent()) {
            MatriculaRenovacionEntity entity = optional.get();
            BeanUtils.copyProperties(dto, entity, "id");
            entity = matriculaRenovacionRepository.save(entity);
            BeanUtils.copyProperties(entity, dto);
            return dto;
        } else {
            throw new RecordNotFoundException("Matrícula no encontrada con ID: " + id, ""+id);
        }
    }

    @Override
    @Transactional
    public void eliminarMatricula(Long id) throws RecordNotFoundException {
        Optional<MatriculaRenovacionEntity> optional = matriculaRenovacionRepository.findById(id);
        if (optional.isPresent()) {
            matriculaRenovacionRepository.deleteById(id);
        } else {
            throw new RecordNotFoundException("Matrícula no encontrada con ID: " + id, ""+id);
        }
    }

    @Override
    public List<MatriculaRenovacionDTO> consultarMatriculas(LocalDate fechaInicio, LocalDate fechaFin, Integer tipoPlan, String alumnoRut, String nombre, String apellido) {
        List<MatriculaRenovacionEntity> entities = matriculaRenovacionRepository.findByFiltros(/* fechaInicio, fechaFin,  */tipoPlan, alumnoRut, nombre, apellido);
        return entities.stream()
                .map(entity -> {
                    MatriculaRenovacionDTO dto = new MatriculaRenovacionDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<MatriculaRenovacionDTO> informeMatriculasRenovaciones(MatriculaRenovacionDTO dto) throws RecordNotFoundException, MatriculaException {
        String msg="";
        int contador=0;
        if (null==dto.getFechaDesde() || null==dto.getFechaHasta()){            
            msg += "Debe ingresar fecha desde y fecha hasta. ";
            contador++; 
        }
        if (null==dto.getTipo() || dto.getTipo().isEmpty()){            
            msg += "Debe ingresar un tipo";
            contador++;
        }

        if ("Todos".equals(dto.getTipo())) {
            dto.setTipo(null);
        }
        if (contador>1){
            throw new MatriculaException(msg, new Exception());
        }

        List<PlanDTO> planesDtos = planRepository.findAll().stream()
                .map(entity -> {
                    PlanDTO dtoPlan = new PlanDTO();
                    BeanUtils.copyProperties(entity, dtoPlan);
                    return dtoPlan;
                })
                .collect(Collectors.toList());

        List<AlumnoDTO> alumnoDtos = alumnoRepository.findAll().stream()
                .map(entity -> {
                    AlumnoDTO dtoAlumno = new AlumnoDTO();
                    BeanUtils.copyProperties(entity, dtoAlumno);
                    return dtoAlumno;
                })
                .collect(Collectors.toList());

        List<MatriculaRenovacionEntity> matricula = new ArrayList<MatriculaRenovacionEntity>();
        matriculaRenovacionRepository.findByRangoFechaAndTipo(dto.getFechaDesde(), dto.getFechaHasta(), dto.getTipo()).forEach(matricula::add);
        return matricula.stream().map(entity -> {
            MatriculaRenovacionDTO dto2 = new MatriculaRenovacionDTO();
            BeanUtils.copyProperties(entity, dto2);
            PlanDTO planDTO = planesDtos.stream()
                        .filter(p -> p.getId().intValue()==dto2.getIdTipoPlan().intValue())
                        .findFirst()
                        .orElse(null);
                if (planDTO != null) {
                    dto2.setTipoPlan(planDTO.getNombre());
                    dto2.setIdTipoPlan(planDTO.getId());
                }
            AlumnoDTO alumnoDTO = alumnoDtos.stream()
                        .filter(u -> u.getRut().equals(dto2.getAlumnoRut()))
                        .findFirst()
                        .orElse(null);
                if (alumnoDTO != null) {
                    dto2.setAlumnoNombre(alumnoDTO.getNombre());
                    dto2.setAlumnoPaterno(alumnoDTO.getPaterno());
                    dto2.setAlumnoMaterno(alumnoDTO.getMaterno());
                }
            return dto2;
        }).collect(Collectors.toList());        
    }

    @Transactional()
     public void notificarMatriculaRenovacion( MatriculaRenovacionDTO matriculaRenovacionDTO) throws MatriculaException {
        RestTemplate restTemplate = new RestTemplate();
        log.info("Inicio envio de mail");
        MailDTO mailDTO = new MailDTO();
        mailDTO.setSubject("Informe stock Critico");
        ParametroDTO parametroDTO = new ParametroDTO();
        parametroDTO.setNombre("MAIL_NOTIFICACION");
        log.info("Parametros envio mail {}", parametroDTO);
        //ResponseEntity<Response> response = restTemplate.postForEntity(uriParametro, parametroDTO,Response.class);
        //ObjectMapper mapper = new ObjectMapper();
        //ParametroDTO mail = mapper.convertValue(response.getBody().getPayload(), new TypeReference<ParametroDTO>(){});
        //dto.setTo(mail.getTexto());
        int mailActivo = parametroRepository.findByNombre("MAIL_ACTIVO").map(ParametroEntity::getValor).orElse(0);
        if (mailActivo==1){
            log.info("Envio de mail activado");
            parametroRepository.findByNombre("MAIL_NOTIFICACION").ifPresent(param -> {
            mailDTO.setTo(param.getTexto());            
            });
            String uriMail = parametroRepository.findByNombre("MAIL_URI_NOTIFICACION").map(ParametroEntity::getTexto).orElseThrow(() -> new MatriculaException("No se encontró el parámetro 'mail_uri_notificacion'", new Exception()));        
            //List<Object> list =  repository.notificacionStockCritico();
            //log.info("cantidad de elementos criticos {}", list.size());
            //List<RespaldoDTO> dtoList = new ArrayList<>();
            String[] toAddresses = mailDTO.getTo().split(";");
            for (String toAddress : toAddresses) {
                mailDTO.setTo(toAddress.trim());
                String body = "";        
                body += "Se ha registrado una nueva matrícula o renovación: \n";
                body += "Alumno: " + matriculaRenovacionDTO.getAlumnoNombre() + " " + matriculaRenovacionDTO.getAlumnoPaterno() + " " + matriculaRenovacionDTO.getAlumnoMaterno() + "\n";
                body += "Plan: " + matriculaRenovacionDTO.getTipoPlan() + "\n";
                body += "Tipo: " + matriculaRenovacionDTO.getTipo() + "\n";
                body += "Fecha de inicio: " + matriculaRenovacionDTO.getFechaInicio() + "\n";
                body += "Fecha de Vencimiento: " + matriculaRenovacionDTO.getFechaVencimiento() + "\n";
                mailDTO.setBody(body);
                ResponseEntity<Response> result = restTemplate.postForEntity(uriMail, mailDTO,Response.class);
                ObjectMapper mapp = new ObjectMapper();
                Boolean mailResponse = mapp.convertValue(result.getBody().getPayload(), new TypeReference<Boolean>(){});
                log.info("respuesta de envio mail {}", mailResponse);
            }        
        } else {
            log.info("Envio de mail desactivado");
        }
    }
}