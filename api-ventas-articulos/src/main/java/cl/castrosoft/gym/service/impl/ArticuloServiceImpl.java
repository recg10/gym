package cl.castrosoft.gym.service.impl;

import cl.castrosoft.gym.dto.*;
import cl.castrosoft.gym.entity.ArticuloEntity;
import cl.castrosoft.gym.exception.ArticuloException;
import cl.castrosoft.gym.exception.RecordNotFoundException;
import cl.castrosoft.gym.exception.SPFErrorCode;
import cl.castrosoft.gym.repository.ArticuloRepository;
import cl.castrosoft.gym.service.ArticuloService;
import cl.castrosoft.gym.service.ClaseService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ArticuloServiceImpl implements ArticuloService {

	private static final Logger logger = LogManager.getLogger(ArticuloServiceImpl.class);

	@Autowired
    ArticuloRepository repository;
    @Autowired
    ClaseService  claseService;

    private static final String uriMail = "http://170.239.85.209:8099/mail/sendMail";

    private static final String uriParametro = "http://170.239.85.209:8095/parametro/getByNombre";

    //private static final String uriParametro = "http://localhost:8095/parametro/getByNombre";

    public ArticuloDTO getArticuloByCodigo(String codigo) throws RecordNotFoundException
    {
        Optional<ArticuloEntity> student = repository.findByCodigo(codigo);
        if(student.isPresent()) {
            ArticuloDTO preventivaDTO = new ArticuloDTO();
        	BeanUtils.copyProperties(student.get(), preventivaDTO);
        	logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
        	logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",Long.valueOf(codigo));
        }
    }

    public ArticuloDTO getArticuloByCodigoBarras(String codigoBarras) throws RecordNotFoundException
    {
        Optional<ArticuloEntity> articulo = repository.findByCodBarras(codigoBarras);
        if(articulo.isPresent()) {
            ArticuloDTO preventivaDTO = new ArticuloDTO();
            BeanUtils.copyProperties(articulo.get(), preventivaDTO);
            logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",Long.valueOf(codigoBarras));
        }
    }

    public Boolean notificarStockCritico() throws ArticuloException{

        RestTemplate restTemplate = new RestTemplate();
        logger.info("Inicio envio de mail");
        MailDTO dto = new MailDTO();
        dto.setSubject("Informe stock Critico");
        ParametroDTO parametroDTO = new ParametroDTO();
        parametroDTO.setNombre("mail_notificacion");
        logger.info("Parametros envio mail {}", parametroDTO);
        ResponseEntity<Response> response = restTemplate.postForEntity(uriParametro, parametroDTO,Response.class);
        ObjectMapper mapper = new ObjectMapper();
        ParametroDTO mail = mapper.convertValue(response.getBody().getPayload(), new TypeReference<ParametroDTO>(){});
        dto.setTo(mail.getTexto());
        List<Object> list =  repository.notificacionStockCritico();
        logger.info("cantidad de elementos criticos {}", list.size());
        List<ArticuloDTO> dtoList = new ArrayList<>();
        String body = "";
        for (Object obtDet: list) {
            Object[] o = (Object[]) obtDet;
            body += "Codigo: " +  (String)o[0] + " Nombre: " +  (String)o[1] + " Precio: "
                    +  (Double)o[2] + " Stock: " +  (Integer)o[3] + "\n";
        }
        dto.setBody(body);
        ResponseEntity<Response> result = restTemplate.postForEntity(uriMail, dto,Response.class);
        ObjectMapper mapp = new ObjectMapper();
        Boolean mailResponse = mapp.convertValue(result.getBody().getPayload(), new TypeReference<Boolean>(){});
        logger.info("respuesta de envio mail {}", mailResponse);
        if (mailResponse){
            return true;
        }else{
            return false;
        }
    }

    public ArticuloDTO getArticuloById(Long id) throws RecordNotFoundException
    {
        Optional<ArticuloEntity> student = repository.findById(id);
        if(student.isPresent()) {
            ArticuloDTO preventivaDTO = new ArticuloDTO();
            BeanUtils.copyProperties(student.get(), preventivaDTO);
            logger.debug("Elemento:"+preventivaDTO.toString());
            return preventivaDTO;
        } else {
            logger.error("RecordNotFoundException");
            throw new RecordNotFoundException("No student record exist for given Codigo {}",id.longValue());
        }
    }

    @Transactional
    public List<ArticuloDTO> getAll() throws RecordNotFoundException
    {
        List<ArticuloEntity> student = repository.findAll();

        List<ClaseDTO> clases = claseService.getAll();

        List<ArticuloDTO > listResult = new ArrayList<ArticuloDTO>();
        for (ArticuloEntity entity: student){
            ArticuloDTO dto = new ArticuloDTO();
            BeanUtils.copyProperties(entity, dto);
            ClaseDTO clase = clases.stream()
                    .filter(e -> e.getId()==dto.getClaseId())
                    .findFirst()
                    .orElse(null);
            dto.setClaseDescripcion(clase!=null?clase.getDescripcion():"");
            listResult.add(dto);
        }
        return listResult;
    }

    public ArticuloDTO guardarProducto(ArticuloDTO articuloDTO) throws RecordNotFoundException, ArticuloException {

        // if (articuloDTO.getCodigo()==null || "".equals(articuloDTO.getCodigo().trim())){
        //     throw new ArticuloException(SPFErrorCode.ARTICULO_SIN_CODIGO, HttpStatus.BAD_REQUEST);
        // }

        if (null==articuloDTO.getId() || 0==articuloDTO.getId()){//debe crear y validar
            Optional<ArticuloEntity> student = repository.findByCodBarras(articuloDTO.getCodBarras());
            if(student.isPresent()) {
                throw new ArticuloException(SPFErrorCode.ARTICULO_YA_EXISTE, HttpStatus.BAD_REQUEST);
            }
        }
        ArticuloEntity entity = new ArticuloEntity();
        BeanUtils.copyProperties(articuloDTO, entity);
        entity = repository.save(entity);
        BeanUtils.copyProperties(entity, articuloDTO);
        logger.info("Articulo almacenado con exito {}", articuloDTO);
        return articuloDTO;
    }

    public void delete (Long id) throws ArticuloException {
        try{
            repository.deleteById(id);
            logger.info("Producto eliminado con exito");
        } catch (Exception e){
            logger.error(e.getMessage());
            throw new ArticuloException(SPFErrorCode.ERROR_ELIMINAR, HttpStatus.BAD_REQUEST);
        }

    }
}
