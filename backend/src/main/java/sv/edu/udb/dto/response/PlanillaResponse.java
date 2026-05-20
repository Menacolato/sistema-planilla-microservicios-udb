package sv.edu.udb.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PlanillaResponse {
    private Long id_planilla;
    private Long idEmpleado;
    private String nombreEmpleado;
    private String periodo;
    private LocalDate fechaGeneracion; // Lo dejamos como LocalDate igual que tu Entidad
    private Double salarioBruto;
    private Double salarioNeto;
    private String detallesDescuentos;  // Agregamos esta línea para quitar el error de detalles
}