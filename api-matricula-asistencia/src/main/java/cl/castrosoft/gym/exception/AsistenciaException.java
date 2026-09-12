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
public class AsistenciaException extends Exception {

    /**
     * ID unico para serializacion.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Constructor de objeto de clase.
     *
     */
    public AsistenciaException(Exception e) {
        super(e);
    }

    public AsistenciaException(String messaje, Exception e) {
        super(messaje, e);
    }


}
