package cl.castrosoft.gym.config;

import cl.castrosoft.gym.dto.ApiErrorDTO;
import cl.castrosoft.gym.exception.SPFErrorCode;
import cl.castrosoft.gym.exception.SPFException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;

/**
 * Clase que permite capturar las excepciones generadas en la capa de servicio y
 * generar mensajes coherentes al consumidor del API REST.
 * 
 * Ventajas: 1) Control total sobre el cuerpo de la respuesta, así como el
 * código de estado. 2) Mapeo de varias excepciones al mismo método, para ser
 * manejado en conjunto. 3) Hace un buen uso de la nueva respuesta RESTful
 * ResposeEntity.
 * 
 * @author INDRA/dgoyarzun
 *
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	/**
	 * Maneja las excepciones provocadas por no encontrar registros.
	 *
	 * @param ex SPFException
	 * @param request the request
	 * @param response the response
	 * @return objeto ApiErrorDTO
	 */
	@ExceptionHandler(SPFException.class)
	protected ResponseEntity<Object> handleSPFException(SPFException ex, WebRequest request,
			HttpServletResponse response) {
		ApiErrorDTO apiError = new ApiErrorDTO(ex.getHttpStatus());

		if (ex.getErrorCode() != null) {
			apiError.setCodeSPF(ex.getErrorCode().getCode());
			apiError.setMessageSPF(ex.getErrorCode().getMessage());
		}

		if (ex.getException() != null) {

			if (ex.getException().getMessage() != null) {
				apiError.setDebugMessage(ex.getException().getMessage());
			} else if (ex.getException().getCause() != null) {
				apiError.setDebugMessage(ex.getException().getCause().getMessage());
			}

		}

		if (ex.getAttributeValidationErrors() != null && ex.getAttributeValidationErrors().size() > 0) {
			
			for (SPFErrorCode error : ex.getAttributeValidationErrors()) {
				apiError.addValidationError(String.valueOf(error.getCode()), error.getMessage());
			}
			
		}

		return buildResponseEntity(apiError);
	}

	/**
	 * Maneja las excepciones provocadas por fallas en los mappers.
	 * 
	 * @param ex SQLSyntaxErrorException
	 * @return objeto ApiErrorDTO
	 */
	@ExceptionHandler({ SQLException.class, BadSqlGrammarException.class, SQLSyntaxErrorException.class })
	protected ResponseEntity<Object> handleSQLEx(SQLSyntaxErrorException ex) {
		ApiErrorDTO apiError = new ApiErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR);

		apiError.setCodeSPF(SPFErrorCode.ORM_ERROR.getCode());
		apiError.setMessageSPF(SPFErrorCode.ORM_ERROR.getMessage());
		apiError.setDebugMessage(ex.getMessage());

		return buildResponseEntity(apiError);
	}

	/**
	 * Maneja otras excepciones.
	 * 
	 * @param ex Exception
	 * @return objeto ApiErrorDTO
	 */
	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> handleOthersExceptions(Exception ex) {
		ApiErrorDTO apiError = new ApiErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR);

		if (ex instanceof JpaSystemException) {
			apiError.setCodeSPF(SPFErrorCode.DATABASE_CONNECTION_ERROR.getCode());
			apiError.setMessageSPF(SPFErrorCode.DATABASE_CONNECTION_ERROR.getMessage());
			apiError.setDebugMessage(ex.getMessage());
		} else if (ex instanceof DataIntegrityViolationException) {
			apiError.setCodeSPF(SPFErrorCode.DATAINTEGRITY_ERROR.getCode());
			apiError.setMessageSPF(SPFErrorCode.DATAINTEGRITY_ERROR.getMessage());
			apiError.setDebugMessage(ex.getMessage());
		} else {
			apiError.setMessageSPF(ex.getMessage());
                        apiError.setDebugMessage(ex.toString());
		}

		return buildResponseEntity(apiError);
	}

	/**
	 * Construye la respuesta para informar la excepcion a la capa FrontEnd.
	 *
	 * @param apiError the api error
	 * @return un objeto ResponseEntity
	 */
	private ResponseEntity<Object> buildResponseEntity(ApiErrorDTO apiError) {
		return new ResponseEntity<>(apiError, apiError.getStatus());
	}
}
