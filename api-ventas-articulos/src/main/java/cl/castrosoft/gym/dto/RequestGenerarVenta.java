package cl.castrosoft.gym.dto;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class RequestGenerarVenta implements Serializable {

    private static final long serialVersionUID = -6045703086084338531L;

    VentaDTO venta;
    List<DetalleVentaDTO> detalle;
}
