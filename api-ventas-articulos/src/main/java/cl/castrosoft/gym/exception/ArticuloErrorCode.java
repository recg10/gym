
package cl.castrosoft.gym.exception;

import org.springframework.lang.Nullable;


/**
 * Enumeracion de codigos de error.<br>
 *
 * @author castrosoft
 * @version 1.0.0
 * @since Sprint 7
 * 
 */
public enum ArticuloErrorCode {

    /** The client not found. */
    ARTICULO_NOT_FOUND(1000L, "No existe Rut de Cliente"),
    /** No hay preguntas Configuradas. */
    ARTICULO_YA_EXISTE(2000L, "Articulo ya existe"),
    /** The orm error. */
    ORM_ERROR(1301L, "Error ORM. Ocurrio un error en el Mapper ."),
    /** The database connection error. */
    // 13xx Errores de sistema.
    DATABASE_CONNECTION_ERROR(1300L, "Error Database. No fue posible conectar con la base de datos."),
    /** The dataintegrity error. */
    DATAINTEGRITY_ERROR(1304L, "Error ORM. Violación de integridad referencial.")
    ;


    /** The code. */
    private final Long code;

    /** The message. */
    private final String message;

    /**
     * Instantiates a new SPF error code.
     *
     * @param code the code
     * @param message the message
     */
    ArticuloErrorCode(Long code, String message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Devuelve el valor del código de error.
     *
     * @return the code
     */
    public Long getCode() {
        return this.code;
    }

    /**
     * Devuelve la descripcion del código de error.
     *
     * @return the message
     */
    public String getMessage() {
        return this.message;
    }



    /**
     * Retorna una representacion en formato String del codigo de error.
     *
     * @return the string
     */
    @Override
    public String toString() {
        return this.code + " " + name();
    }

    /**
     * Devuelve la constante de enumeración de este tipo con el valor numérico
     * especificado.
     *
     * @param code El código de la enumeración a retornar.
     * @return la enumeración asociada al código consultado.
     * @throws IllegalArgumentException Si esta enumeración no existe para el
     * código especificado.
     */
    public static ArticuloErrorCode valueOf(Long code) {
        ArticuloErrorCode enumeration = resolve(code);
        if (enumeration == null) {
            throw new IllegalArgumentException("No matching constant for [" + code + "]");
        }
        return enumeration;
    }

    /**
     * Resolve the given status code to an {@code SPFErrorCode}, if possible.
     *
     * @param code the code
     * @return the corresponding {@code SPFErrorCode}, or {@code null} if not
     * found
     */
    @Nullable
    public static ArticuloErrorCode resolve(Long code) {
        for (ArticuloErrorCode enumeration : values()) {
            if (enumeration.code.equals(code)) {
                return enumeration;
            }
        }
        return null;
    }

}
