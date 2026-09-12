/**
 *
 */
package cl.castrosoft.gym.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Clase que se encarga de manejar los errores de las visitas.
 *
 * @author rcastro
 *
 */
public class ArticuloException extends SPFException {

    /**
     * ID unico para serializacion.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Constructor de objeto de clase.
     *
     * @param errorCode El enum que describe el error especifico a retornar.
     * @param httpStatus El enum que describe el estado HTTP a retornar.
     */
    public ArticuloException(SPFErrorCode errorCode, HttpStatus httpStatus) {
        super(errorCode, httpStatus);
    }

    /**
     * Constructor de objeto de clase.
     *
     * @param e Excepcion original.
     * @param errorCode El enum que describe el error especifico a retornar.
     * @param httpStatus El enum que describe el estado HTTP a retornar.
     */
    public ArticuloException(Throwable e, SPFErrorCode errorCode, HttpStatus httpStatus) {
        super(e, errorCode, httpStatus);
    }
}
