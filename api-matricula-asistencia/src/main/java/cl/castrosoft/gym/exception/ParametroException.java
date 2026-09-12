/**
 *
 */
package cl.castrosoft.gym.exception;


/**
 * Clase que se encarga de manejar los errores de las visitas.
 *
 * @author rcastro
 *
 */
public class ParametroException extends Exception {

    /**
     * ID unico para serializacion.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Constructor de objeto de clase.
     *
     */
    public ParametroException(Exception e) {
        super(e);
    }

    public ParametroException(String messaje, Exception e) {
        super(messaje, e);
    }


}
