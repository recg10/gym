package cl.castrosoft.gym.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.jsontype.impl.TypeIdResolverBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
// TODO: Auto-generated Javadoc
/**
 * Clase que representa el detalle de un error de la aplicación.
 * 
 * @author INDRA/dgoyarzun
 *
 */

/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
@Data
public class ApiErrorDTO {
	
	/** The status. */
	private HttpStatus status;
	
	/** The timestamp. */
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;
	
	/** The code SPF. */
	private Long codeSPF;
	
	/** The message SPF. */
	private String messageSPF;
	
	/** The debug message. */
	private String debugMessage;
	
	/** The sub errors. */
	private List<ApiSubError> subErrors;

	/**
	 * Instantiates a new api error DTO.
	 */
	public ApiErrorDTO() {
        timestamp = LocalDateTime.now();
    }

	/**
	 * Instantiates a new api error DTO.
	 *
	 * @param status the status
	 */
	public ApiErrorDTO(HttpStatus status) {
        this();
        this.status = status;
    }

	/**
	 * Instantiates a new api error DTO.
	 *
	 * @param status the status
	 * @param ex the ex
	 */
	public ApiErrorDTO(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.messageSPF = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

	/**
	 * Instantiates a new api error DTO.
	 *
	 * @param status the status
	 * @param message the message
	 * @param ex the ex
	 */
	public ApiErrorDTO(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.messageSPF = message;
        this.debugMessage = ex.getLocalizedMessage();
    }

	/**
	 * Adds the sub error.
	 *
	 * @param subError the sub error
	 */
	private void addSubError(ApiSubError subError) {
		if (subErrors == null) {
			subErrors = new ArrayList<>();
		}
		subErrors.add(subError);
	}

	/**
	 * Adds the validation error.
	 *
	 * @param object the object
	 * @param field the field
	 * @param rejectedValue the rejected value
	 * @param message the message
	 */
	private void addValidationError(String object, String field, Object rejectedValue, String message) {
		addSubError(new ApiValidationError(object, field, rejectedValue, message));
	}

	/**
	 * Adds the validation error.
	 *
	 * @param object the object
	 * @param message the message
	 */
	public void addValidationError(String object, String message) {
		addSubError(new ApiValidationError(object, message));
	}

	/**
	 * Adds the validation error.
	 *
	 * @param fieldError the field error
	 */
	private void addValidationError(FieldError fieldError) {
		this.addValidationError(fieldError.getObjectName(), fieldError.getField(), fieldError.getRejectedValue(),
				fieldError.getDefaultMessage());
	}

	/**
	 * Adds the validation errors.
	 *
	 * @param fieldErrors the field errors
	 */
	void addValidationErrors(List<FieldError> fieldErrors) {
		fieldErrors.forEach(this::addValidationError);
	}

	/**
	 * Adds the validation error.
	 *
	 * @param objectError the object error
	 */
	private void addValidationError(ObjectError objectError) {
		this.addValidationError(objectError.getObjectName(), objectError.getDefaultMessage());
	}

	/**
	 * Adds the validation error.
	 *
	 * @param globalErrors the global errors
	 */
	void addValidationError(List<ObjectError> globalErrors) {
		globalErrors.forEach(this::addValidationError);
	}

	/**
	 * Utility method for adding error of ConstraintViolation. Usually when
	 * a @Validated validation fails.
	 *
	 * @param cv the ConstraintViolation

	private void addValidationError(ConstraintViolation<?> cv) {
		this.addValidationError(cv.getRootBeanClass().getSimpleName(),
				((PathImpl) cv.getPropertyPath()).getLeafNode().asString(), cv.getInvalidValue(), cv.getMessage());
	}
*/
	/**
	 * Adds the validation errors.
	 *
	 * @param constraintViolations the constraint violations

	void addValidationErrors(Set<ConstraintViolation<?>> constraintViolations) {
		constraintViolations.forEach(this::addValidationError);
	}
	 */
	/**
	 * The Class ApiSubError.
	 */
	abstract class ApiSubError {

	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Data
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@EqualsAndHashCode(callSuper = false)
	
	/**
	 * Instantiates a new api validation error.
	 *
	 * @param object the object
	 * @param field the field
	 * @param rejectedValue the rejected value
	 * @param message the message
	 */
	@AllArgsConstructor
	class ApiValidationError extends ApiSubError {
		
		/** The object. */
		private String object;
		
		/** The field. */
		private String field;
		
		/** The rejected value. */
		private Object rejectedValue;
		
		/** The message. */
		private String message;

		/**
		 * Instantiates a new api validation error.
		 *
		 * @param object the object
		 * @param message the message
		 */
		ApiValidationError(String object, String message) {
			this.object = object;
			this.message = message;
		}
	}
}

class LowerCaseClassNameResolver extends TypeIdResolverBase {

	@Override
	public String idFromValue(Object value) {
		return value.getClass().getSimpleName().toLowerCase();
	}

	@Override
	public String idFromValueAndType(Object value, Class<?> suggestedType) {
		return idFromValue(value);
	}

	@Override
	public JsonTypeInfo.Id getMechanism() {
		return JsonTypeInfo.Id.CUSTOM;
	}
}