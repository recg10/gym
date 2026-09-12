package cl.castrosoft.gym.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// TODO: Auto-generated Javadoc

/**
 * SPFException class for all controllers to retirn Http error code.
 *
 * @author INDRA/jrisequilla
 */
public class SPFException extends ResponseStatusException {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 3772367625601295465L;


    /**
     * SPF error code.
     */
    
    /**
     * Gets the error code.
     *
     * @return the error code
     */
    @Getter
    private SPFErrorCode errorCode;

    /**
     * Http Status.
     */
    
    /**
     * Gets the http status.
     *
     * @return the http status
     */
    @Getter
    private HttpStatus httpStatus;


    /**
     * Error in attribute validation.
     */
    
    /**
     * Gets the attribute validation errors.
     *
     * @return the attribute validation errors
     */
    @Getter
    private List<SPFErrorCode> attributeValidationErrors;


    /** Exception. */
    
    /**
     * Gets the exception.
     *
     * @return the exception
     */
    @Getter
    private Throwable exception;

    /**
     * Instantiates a new SPF exception.
     *
     * @param httpStatus the http status
     */
    public SPFException(HttpStatus httpStatus) {
        super(httpStatus);
        this.httpStatus = httpStatus;
    }

    /**
     * Instantiates a new SPF exception.
     *
     * @param e the e
     * @param httpStatus the http status
     */
    public SPFException(Throwable e, HttpStatus httpStatus) {
        super(httpStatus);
        this.httpStatus = httpStatus;
        this.exception = e;
    }

    /**
     * Instantiates a new SPF exception.
     *
     * @param errorCode the error code
     * @param httpStatus the http status
     */
    public SPFException(SPFErrorCode errorCode, HttpStatus httpStatus) {
        super(httpStatus, errorCode.getMessage());
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

    /**
     * Instantiates a new SPF exception.
     *
     * @param errorCode the error code
     * @param attributeValidationErrors the attribute validation errors
     * @param httpStatus the http status
     */
    public SPFException(SPFErrorCode errorCode, List<SPFErrorCode> attributeValidationErrors, HttpStatus httpStatus) {
        super(httpStatus, errorCode.getMessage());
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.attributeValidationErrors = attributeValidationErrors;
    }

    /**
     * Instantiates a new SPF exception.
     *
     * @param e the e
     * @param errorCode the error code
     * @param httpStatus the http status
     */
    public SPFException(Throwable e, SPFErrorCode errorCode, HttpStatus httpStatus) {
        super(httpStatus, errorCode.getMessage());
        this.exception = e;
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

    /**
     * Creates the bad request exception.
     *
     * @param spfErrorCode the spf error code
     * @return the SPF exception
     */
    public static SPFException createBadRequestException(SPFErrorCode spfErrorCode) {
        return createSpfException(spfErrorCode, HttpStatus.BAD_REQUEST);
    }

    /**
     * Creates the no content exception.
     *
     * @param spfErrorCode the spf error code
     * @return the SPF exception
     */
    public static SPFException createNoContentException(SPFErrorCode spfErrorCode) {
        return createSpfException(spfErrorCode, HttpStatus.NO_CONTENT);
    }

    /**
     * Creates the spf exception.
     *
     * @param spfErrorCode the spf error code
     * @param noContent the no content
     * @return the SPF exception
     */
    private static SPFException createSpfException(SPFErrorCode spfErrorCode, HttpStatus noContent) {
        return new SPFException(spfErrorCode, noContent);
    }


}
