package cl.castrosoft.gym.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {

    private String message;
    private String errors;
    private Object payload;

    /**
     * Contructor de Clase
     */
    public Response() {
    }

    /**
     * Constructor de la clase
     *
     * @param message Mensaje expuesto cuando vaya de entra y salida en el servicio
     * @param errors  Mensaje de errores en la captura del servicio
     * @param payload Un Object la clase mas alta en Java, puede enviar cualquier
     *                instancia heredade de esta clase.
     */
    public Response(String message, String errors, Object payload) {
        this.message = message;
        this.errors = errors;
        this.payload = payload;
    }

    /**
     * Devuelve una represtanción del objecto en forma de texto
     */
    @Override
    public String toString() {
        return "CobranzaResponse{" + "message='" + message + '\'' + ", errors=" + errors + ", payload=" + payload + '}';
    }
}
