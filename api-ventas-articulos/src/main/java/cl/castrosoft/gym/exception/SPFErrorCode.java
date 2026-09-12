
package cl.castrosoft.gym.exception;

import org.springframework.lang.Nullable;


/**
 * Enumeracion de codigos de error SPF.<br>
 *
 * @author indra
 * @version 1.0.0
 * @since Sprint 7
 * 
 */
public enum SPFErrorCode {

    /** The client not found. */
    CLIENT_NOT_FOUND(1000L, "No existe Rut de Cliente"),
    /** No hay preguntas Configuradas. */
    ARTICULO_YA_EXISTE(2000L, "Articulo ya existe"),
    /** TEST_SIN_PARAMETROS_CONFIFURADOS. */
    ERROR_ELIMINAR(3000L, "Error a eliminar"),
    /** CURSO NO CONFIGURADPO EN PARAMETROOS*/
    ARTICULO_SIN_CODIGO(4000L, "Falta código de artículo"),

    ARTICULO_SIN_CODIGO_ALTERNATVO(5000L, "Falta código de alternativo"),

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
    SPFErrorCode(Long code, String message) {
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
     * Devuelve la serie asociada al código de error SPF.
     *
     * @return the series
     * @see Series
     */
    public Series series() {
        return Series.valueOf(this);
    }

    /**
     * Si este código de error está en la serie SPF <br>
     * <br>
     * el link para verificar el valor de {@link #series()}.
     *
     * @return boolean
     * @see #series()
     */
    public boolean is1xxxGeneral() {
        return (series() == Series.GENERAL);
    }

    /**
     * Si este código de error está en la serie SPF
     * <br>
     * es el link para verificar el valor de {@link #series()}.
     *
     * @return boolean
     * @see #series()
     */
    public boolean is2xxxDirectory() {
        return (series() == Series.DIRECTORY);
    }

    /**
     * Si este código de error está en la serie SPF
     * el link para verificar el valor de {@link #series()}.
     *
     * @return true, if is 3 xxx admin
     * @see #series()
     */
    public boolean is3xxxAdmin() {
        return (series() == Series.ADMIN);
    }

    /**
     * Si este código de error está en la serie SPF
     * el link para verificar el valor de {@link #series()}.
     *
     * @return true, if is 4 xxx capital
     * @see #series()
     */
    public boolean is4xxxCapital() {
        return (series() == Series.CAPITAL);
    }

    /**
     * Si este código de error está en la serie SPF

     * el link para verificar el valor de {@link #series()}.
     *
     * @return true, if is 5 xxx society
     * @see #series()
     */
    public boolean is5xxxSociety() {
        return (series() == Series.SOCIETY);
    }

    /**
     * Si este código de error está en la serie SPF
     * Este es el link para verificar el valor de {@link #series()}.
     *
     * @return true, if is error
     * @since 5.0
     */
    public boolean isError() {
        return (is1xxxGeneral() || is5xxxSociety());
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
    public static SPFErrorCode valueOf(Long code) {
        SPFErrorCode enumeration = resolve(code);
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
    public static SPFErrorCode resolve(Long code) {
        for (SPFErrorCode enumeration : values()) {
            if (enumeration.code.equals(code)) {
                return enumeration;
            }
        }
        return null;
    }

    /**
     * Series de codigos de error.
     * <p>
     * Retrievable via {@link SPFErrorCode#series()}.
     */
    public enum Series {

        /** The general. */
        GENERAL(1),
        
        /** The directory. */
        DIRECTORY(2),
        
        /** The admin. */
        ADMIN(3),
        
        /** The capital. */
        CAPITAL(4),
        
        /** The society. */
        SOCIETY(5),
        
        /** The security. */
        SECURITY(6);

        /** The value. */
        private final int value;

        /**
         * Instantiates a new series.
         *
         * @param value the value
         */
        Series(int value) {
            this.value = value;
        }

        /**
         * Devuelve el valor entero de esta serie de códigos de error. Los
         * rangos de 1 a 5 (Puede aumentar a más de 5, en la medida que avance
         * el desarrollo).
         *
         * @return the int
         */
        public int value() {
            return this.value;
        }

        /**
         * Return the enum constant of this type with the corresponding series.
         *
         * @param error the error
         * @return the enum constant of this type with the corresponding series
         * @throws IllegalArgumentException if this enum has no corresponding
         * constant
         */
        public static Series valueOf(SPFErrorCode error) {
            return valueOf(error.code);
        }

        /**
         * Devuelve la serie correspondiente al codigo de error SPF.
         *
         * @param code El codigo de error SPF.
         * @return La enumeración correspondiente a la serie.
         * @throws IllegalArgumentException si no existe una seria asociada al
         * codigo del error SPF.
         */
        public static Series valueOf(Long code) {
            Series series = resolve(code);
            if (series == null) {
                throw new IllegalArgumentException("No se encontro una serie asociada al codigo de error [" + code + "]");
            }
            return series;
        }

        /**
         * Resuelve el código de error dado a un {@code SPFErrorCode.Series}, si
         * es posible.
         *
         * @param code El código de error SPF
         * @return El correspondiente {@code Series}, o {@code null} si no se
         * encuentra.
         */
        @Nullable
        public static Series resolve(Long code) {
            Long seriesCode = code / 1000;
            for (Series series : values()) {
                if (series.value == seriesCode) {
                    return series;
                }
            }
            return null;
        }
    }

}
