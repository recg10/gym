package cl.castrosoft.gym.util;

import cl.castrosoft.gym.dto.Response;

/**
 * Clase estatica para la contruccion de respuesta
 * se puede ocupar en uno o mas clases
 * 
 * 
 * @author Rodrigo Castro
 *
 */
public class UtilResponse {

    /**
     * Contructor de Clase
     */
    private UtilResponse() {
        // Contructor de Clase
    }
    public static Response crearResponse(String mensaje, String error, Object payload) {
        Response respuesta = new Response();
        respuesta.setPayload(payload);
        respuesta.setMessage(mensaje);
        respuesta.setErrors(error);
        return respuesta;
    }
}
